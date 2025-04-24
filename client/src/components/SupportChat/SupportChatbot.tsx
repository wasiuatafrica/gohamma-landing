/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import { useForm } from "react-hook-form";
// import Image from 'next/image';
import { MdMessage } from "react-icons/md";
import useOnclickOutside from "react-cool-onclickoutside";
import axios, { AxiosError } from "axios";
import { BsStars } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import TypingChatbot from "../../../../public/typing_chatbot.svg";
import "./supportChat.css";
import { useToast } from "@/hooks/use-toast";
import LoadingBox from "../loadingbox/LoadingBox";
import SyncLoading from "../loadingbox/SyncLoader";
import { useChatbot } from "@/context/ChatbotContext"; // Import the context hook

// Type for the errors object in extractFirstErrorMessage and API responses
type ErrorObject = Record<string, { message: string }[] | string[]>;

interface ApiErrorData extends ErrorObject {}

import { AxiosResponse, AxiosRequestConfig } from "axios"; // Import necessary types

interface ApiError extends AxiosError<ApiErrorData> { // Specify the data type for AxiosError
  response?: AxiosResponse<ApiErrorData>; // Use AxiosResponse with the specific data type
}


function extractFirstErrorMessage(errors: ErrorObject): string | null {
  const combinedErrors = Object.values(errors).flatMap((errorArray) =>
    // Ensure we only process arrays and handle potential non-string/non-object elements
    Array.isArray(errorArray) ? errorArray.map(err => typeof err === 'object' && err?.message ? err.message : typeof err === 'string' ? err : undefined) : []
  ).filter((msg): msg is string => typeof msg === 'string'); // Filter out undefined and ensure string type
  if (combinedErrors.length > 0) {
    return combinedErrors[0]; // Return the first error message from the combined array
  }
  return null; // Return null if no errors found
}

// Type for form values
interface SupportFormInputs {
  email: string;
  name: string;
}

// Type for individual messages in the chat
interface ChatMessageContent {
  content?: string; // Original content from bot/admin?
  response?: string; // Formatted HTML response
  fullname?: string; // Name of bot/admin
  id?: string | number; // Message ID
  thread?: string; // Thread ID
  chat_switched_to_admin?: boolean;
}

interface ChatMessage {
  sender: 'user' | 'assistant' | string; // Allow other strings for admin?
  message: string | ChatMessageContent;
  created?: Date | string; // Allow string for potential serialization issues
  user_pics?: string; // URL for admin avatar?
  user_name?: string; // Admin name?
  thread_value?: string; // Seems related to thread ID
}

// Type for the data received via WebSocket
interface WebSocketData {
  message: ChatMessageContent | ChatMessage[]; // Can be single message or array
  sender?: 'assistant' | string; // Sender might be in top-level data too
  user_pics?: string;
  user_name?: string;
  thread_value?: string;
}

// Type for the voteBotResponse formData
interface VoteFormData {
  message: string | number; // Assuming message ID
  vote: 'upvote' | 'downvote';
  thread?: string;
  email: string;
  name: string;
  feedback?: string; // Optional feedback for downvote
}


const SupportChatbot = () => {
  const chatRef = useRef<HTMLFormElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const chatbotWindowRef = useRef<HTMLDivElement>(null); // Ref for the main chatbot window
  const { toast } = useToast();
  const { isChatbotOpen, setIsChatbotOpen } = useChatbot(); // Use the context state

  const {
    register,
    handleSubmit: hookHandleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SupportFormInputs>();
  const thumbsDownRef = useOnclickOutside(() => setModalCount(undefined));
  // Hook to close the chatbot when clicking outside
  useOnclickOutside(() => {
    if (isChatbotOpen) {
      setIsChatbotOpen(false);
    }
  }, { refs: [chatbotWindowRef] }); // Correct key: 'refs' and pass ref in an array

  //   const router = useRouter();

  // const [show, setshow] = useState(false); // Remove internal state
  const [showChart, setshowChart] = useState(true); // Keep this for the initial form vs chat view

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState(false);
  const [botVoteLoading, setBotVoteLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [modalCount, setModalCount] = useState<number | undefined>();

  const lastFT9jaMessage = messages
    .filter((msg): msg is ChatMessage & { message: ChatMessageContent } => typeof msg.message === 'object' && msg.sender !== "user")
    .pop();

  const isChatSwitchedToAdmin = lastFT9jaMessage?.message?.chat_switched_to_admin === true;


  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight + 200,
        behavior: "smooth",
      });
    }
  };

  const promptBot = (msg: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      initializeWebSocket(); // This might need adjustment if name/email aren't available yet
      return toast({
        title: "Kindly hold on...",
        variant: "destructive",
      });
    }

    if (!msg) return;
    if (socket) {
      setLoading(true);
      socket.send(JSON.stringify({ message: msg }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: msg, sender: "user", created: new Date() },
      ]);
      setMessage("");

      scrollToBottom(scrollableRef);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      initializeWebSocket(); // This might need adjustment if name/email aren't available yet
      return toast({
        title: "Kindly hold on...",
        variant: "destructive",
      });
    }

    if (!message) return;
    if (socket) {
      setLoading(!isChatSwitchedToAdmin);
      socket.send(JSON.stringify({ message: message }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: message, sender: "user", created: new Date() },
      ]);
      setMessage("");
      scrollToBottom(scrollableRef);
    }
  };

  const initializeWebSocket = () => {
    const email: string = getValues("email");
    const name: string = getValues("name");

    if (!email || !name) {
      // Consider if this should prevent socket creation or just show toast
      toast({
        title: "Kindly input your name and email.",
        variant: "destructive",
      });
      return;
    }
    const isProduction = "api-hamma-f0bcaabf77ea.herokuapp.com".includes(
      "herokuapp"
    );
    const protocol = isProduction ? "wss" : "ws";
    const socketUrl = `${protocol}://${"api-hamma-f0bcaabf77ea.herokuapp.com".replace(
      /^http(s)?:\/\//,
      ""
    )}/ws/no-auth-support/?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    const newSocket = new WebSocket(socketUrl);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    newSocket.onmessage = (event: MessageEvent) => {
      const data: WebSocketData = JSON.parse(event.data);
      console.log("data.message", data.message); // Be mindful of logging potentially sensitive data

      const formatContent = (content: string | undefined): string => {
        if (!content) return "";
        // Remove JSON blocks
        content = content.replace(/```json\s*[\s\S]*?\s*```/g, "");

        let formattedContent = content.replace(/```([\s\S]*?)```/g, (match) => {
          return match.replace(/\n/g, "PLACEHOLDER_FOR_NEWLINE");
        });
        formattedContent = formattedContent.replace(/\n/g, "<br>");
        formattedContent = formattedContent.replace(
          /PLACEHOLDER_FOR_NEWLINE/g,
          "\n"
        );

        formattedContent = formattedContent.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );
        formattedContent = formattedContent.replace(
          /\*(.*?)\*/g,
          "<em>$1</em>"
        );
        formattedContent = formattedContent.replace(
          /`([^`]+)`/g,
          '<code class="block bg-[#0d0d0d] text-white p-3 m-2">$1</code>'
        );
        formattedContent = formattedContent.replace(
          /```([\s\S]*?)```/g,
          "<pre><code>$1</code></pre>"
        );

        formattedContent = formattedContent.replace(
          /###### (.*?)<br>/g,
          '<h6 class="py-2">$1</h6>'
        );
        formattedContent = formattedContent.replace(
          /##### (.*?)<br>/g,
          '<h6 class="py-2">$1</h6>'
        );
        formattedContent = formattedContent.replace(
          /#### (.*?)<br>/g,
          '<h6 class="py-2">$1</h6>'
        );
        formattedContent = formattedContent.replace(
          /### (.*?)<br>/g,
          '<h6 class="py-2">$1</h6>'
        );
        formattedContent = formattedContent.replace(
          /## (.*?)<br>/g,
          '<h6 class="py-2">$1</h6>'
        );
        formattedContent = formattedContent.replace(
          /# (.*?)<br>/g,
          '<h6 class="py-2">$1</h6>'
        );

        formattedContent = formattedContent.replace(
          /(\d+)\. (.*?)<br>/g,
          (match, p1, p2) => `<li>${p2}</li>`
        );
        formattedContent = formattedContent.replace(
          /(<li>.*?<\/li>)+/g,
          (match) => `<ol>${match}</ol>`
        );
        formattedContent = formattedContent.replace(
          /^\*\s(.*?)$/gm,
          "<li>$1</li>"
        );
        formattedContent = formattedContent.replace(
          /(<li>.*?<\/li>)+/g,
          (match) => `<ul>${match}</ul>`
        );
        formattedContent = formattedContent.replace(
          /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g,
          '<a class="text-blue-500 underline transition hover:text-blue-300" href="$2" target="_blank">$1</a>'
        );

        return formattedContent;
      };

      if (Array.isArray(data.message)) {
        const newMessages: ChatMessage[] = data.message
          .map((msg): ChatMessage | null => {
            if (typeof msg.message === 'object') {
              return {
                ...msg,
                message: {
                  ...msg.message,
                  response: formatContent(msg.message.content),
                },
                created: msg.created ? new Date(msg.created) : new Date(), // Ensure Date object
              };
            }
            return null; // Handle cases where message might not be an object if expected
          })
          .filter((msg): msg is ChatMessage => msg !== null); // Type guard

        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        setLoading(false);

        // updateQueryParams('thread', newMessages[0]?.thread_value ?? "");
      } else if (typeof data.message === 'object') {
         const newMessage: ChatMessage = {
           sender: data.sender || "assistant", // Use sender from data or default
           message: {
             ...data.message,
             response: formatContent(data.message.content),
           },
           created: new Date(), // Assuming new messages get current timestamp
           user_pics: data.user_pics,
           user_name: data.user_name,
           thread_value: data.thread_value,
         };
         setMessages((prevMessages) => [...prevMessages, newMessage]);
         setLoading(false);
         // updateQueryParams('thread', data?.thread_value ?? "");
      } else {
         console.warn("Received WebSocket message in unexpected format:", data);
      }
    };

    newSocket.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      toast({ title: "WebSocket error. Please try again.", variant: "destructive" });
      setLoading(false);
    };

    newSocket.onclose = (event: CloseEvent) => {
      console.log("WebSocket connection closed:", event);
      console.log("WebSocket connection closed. Please refresh the page.");
      setLoading(false);
    };

    return () => {
      if (newSocket) newSocket.close();
    };
  };

  // const clearMessagesAndRestart = () => {
  //         setLoading(false)
  //         setMessages([]);
  //         if (socket) socket.close();
  //         initializeWebSocket();
  // };

  const submitHandler = async ({ email, name }: SupportFormInputs) => {
    if (email && name) {
      // initializeWebSocket(); // Called via useEffect now
      setshowChart(false);
    }
  };

  //   useEffect(() => {
  //     if (router.query.chatbot == "true") setshow(true);

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [router.query.chatbot]);

  // This useEffect might cause issues if email/name change while socket is open
  // Consider closing the old socket and opening a new one if needed, or preventing changes.
  useEffect(() => {
    const email = getValues("email");
    const name = getValues("name");

    if (email && name && !socket) { // Only initialize if not already connected
      initializeWebSocket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues("email"), getValues("name"), socket]); // Add socket to dependency array

  const voteBotResponse = async (formData: VoteFormData) => {
    try {
      setBotVoteLoading(true);

      const { data } = await axios.post(
        `https://api-hamma-f0bcaabf77ea.herokuapp.com/support/bot/rate-response/`,
        formData
      );

      toast({
        title: "Thanks for the feedback",
      });
    } catch (err) {
      const error = err as ApiError;
      console.error("Vote error:", error);
      toast({
        description: error.response?.data
          ? extractFirstErrorMessage(error.response.data) ?? "An unknown error occurred"
          : error.message ?? "An unknown error occurred",
      });
    } finally {
       setBotVoteLoading(false);
    }
  };

  const handleReconnecttoAI = async () => {
     if (!lastFT9jaMessage?.message?.thread) {
       toast({ title: "Cannot reconnect: Missing thread information.", variant: "destructive" });
       return;
     }
    try {
      setLoading(true);
      const { data } = await axios.put(
        `https://api-hamma-f0bcaabf77ea.herokuapp.com/support/switch-back-to-ai-bot/${lastFT9jaMessage.message.thread}`
      );
      toast({ title: `Reconnecting...` }); // Use toast object
    } catch (err) {
       const error = err as ApiError;
      console.error("Reconnect error:", error);
      toast({
        description: error.response?.data
          ? extractFirstErrorMessage(error.response.data) ?? "An unknown error occurred"
          : error.message ?? "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" fixed z-[1000] right-4 md:right-6 bottom-6 flex flex-col justify-end items-end">
      <AnimatePresence initial={false} mode="wait">
        {isChatbotOpen && ( // Use context state for visibility
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.35 }}
            className={
              "bg-white rounded-md  mb-4 overflow-hidden w-[408px] h-[640px]  min-w-[100px]  min-h-[100px] max-h-[80vh] max-w-[90vw]"
            }
            style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 16px" }}
            ref={chatbotWindowRef} // Attach the ref to the main window div
          >
            <div className="bg-[#282828] w-full p-4 flex justify-between items-center gap-2 ">
              <div className="h-12 w-20 -mb-4">
              <svg width="123" height="26" viewBox="0 0 123 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M113.191 7.9734H114.826V26H113.191V7.9734Z" fill="white" />
                    <path d="M105.018 0.866661C105.018 0.388017 105.42 0 105.917 0H122.101C122.597 0 123 0.388018 123 0.866663V9.0133C123 9.49195 122.597 9.87996 122.101 9.87996H105.917C105.42 9.87996 105.018 9.49195 105.018 9.0133V0.866661Z" fill="#19F256" />
                    <path d="M27.1165 21.1996H27.5315V25.9996H27.1165V21.1996Z" fill="white" />
                    <path d="M25.8701 20.7999H28.9133V22.6239H25.8701V20.7999Z" fill="#19F256" />
                    <path d="M9.81842 1.03999H15.5908V25.9999H9.81842V16.2759H5.77237V25.9999H0V1.03999H5.77237V10.7639H9.81842V1.03999Z" fill="white" />
                    <path d="M29.9463 1.03999L37.391 25.9999H31.4028L27.0331 11.4399L22.6634 25.9999H16.6752L24.1739 1.03999H29.9463Z" fill="white" />
                    <path d="M52.8625 1.03999H58.5809V25.9999H52.8086V13.5199L49.7875 20.1239H47.252L44.2309 13.5199V25.9999H38.4586V1.03999H44.2309L48.5467 10.3999L52.8625 1.03999Z" fill="white" />
                    <path d="M75.1474 1.03999H80.8658V25.9999H75.0935V13.5199L72.0724 20.1239H69.5369L66.5158 13.5199V25.9999H60.7435V1.03999H66.5158L70.8316 10.3999L75.1474 1.03999Z" fill="white" />
                    <path d="M95.2205 1.03999L102.665 25.9999H96.677L92.3073 11.4399L87.9376 25.9999H81.9494L89.4481 1.03999H95.2205Z" fill="white" />
                </svg>
              </div>

              <Tippy
                content={"reconnect to AI chatbot"}
                placement="top" // You can change the placement as needed
                maxWidth="350px" // Optional: Adjust maxWidth directly
              >
                <>
                  {isChatSwitchedToAdmin && ( /* Render button only if true */
                    <button
                      className="rounded-full w-[32px] h-[32px] min-w-[32px] min-h-[32px] text-black bg-[#fff] transition flex items-center justify-center hover:scale-[0.9]"
                      onClick={() => handleReconnecttoAI()}
                    >
                      <BsStars size={20} />
                    </button>
                  )}
                </>
              </Tippy>
            </div>

            {!showChart ? (
              <>
                <div
                  className="w-full p-2  overflow-y-scroll"
                  style={{ height: "calc( 100% - 64px - 56px - 5px  )" }}
                  ref={scrollableRef}
                >
                  <div className="flex flex-col mb-6 ">
                    <div className="flex gap-4">
                      <span
                        className={`flex justify-center items-center capitalize text-center text-white font-semibold w-6 h-6 min-w-6 min-h-6 rounded-full overflow-hidden bg-[#00BA77]`}
                      >
                        {/* Corrected img tag and simplified logic */}
                        <img
                          src={
                            lastFT9jaMessage?.message?.fullname?.includes("George Soros")
                              ? "https://ft9japayoutbucket3.s3.amazonaws.com/media/support_profile_images/male_profile.jpg"
                              : lastFT9jaMessage?.message?.fullname // Check if fullname exists before assuming female
                              ? "https://ft9japayoutbucket3.s3.amazonaws.com/media/support_profile_images/female_profile.jpg"
                              : "https://i.pinimg.com/564x/1e/71/2d/1e712d2318258083c0df91f9ec749b77.jpg" // Default avatar
                          }
                          alt="Chatbot avatar"
                          width={500}
                          height={500}
                          className="object-cover w-full h-full"
                        />
                      </span>

                      <div className="max-w-[80%] w-fit text-[14px] bg-[#f2f2f2] text-[#1e1e1e] font-medium p-2 rounded-[10px] rounded-tl-none group">
                        <p className="text-[#00BA77] font-bold text-[14px] mb-2">
                          Hamma Chatbot {/* Directly use the name */}
                        </p>
                        <p>Hello! Welcome to Hamma 👋</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span
                        className={`flex justify-center items-center capitalize text-center text-white font-semibold w-6 h-6 min-w-6 min-h-6 rounded-full overflow-hidden bg-[#00BA77] opacity-0`}
                      >
                        {/* This seems like a placeholder for alignment, keep img tag */}
                        <img
                          src={
                            "https://i.pinimg.com/564x/1e/71/2d/1e712d2318258083c0df91f9ec749b77.jpg"
                          }
                          alt="Placeholder avatar"
                          width={500}
                          height={500}
                          className="object-cover w-full h-full"
                        />{" "}
                      </span>
                      <div className="max-w-[80%] w-fit text-[14px] bg-[#f2f2f2] text-[#1e1e1e] font-medium p-2 rounded-[10px] rounded-tl-none group mt-2">
                        <p className="text-[#00BA77] font-bold text-[14px] mb-2">
                          Hamma Chatbot {/* Directly use the name */}
                        </p>
                        <p>What are you interested in doing today?</p>
                      </div>
                    </div>

                    {messages.length === 0 && (
                      <div className="flex justify-center flex-col gap-1  mb-3 mt-2 ml-10 text-[#1e1e1e]">
                        <button
                          className="block w-fit text-[12px] text-offBlack border border-solid border-[#00BA77] rounded-[5px] p-1.5  transition hover:opacity-60"
                          disabled={loading}
                          onClick={() => promptBot("How does this work")}
                        >
                          How does this work
                        </button>
                        <button
                          className="block w-fit text-[12px] text-offBlack border border-solid border-[#00BA77] rounded-[5px] p-1.5  transition hover:opacity-60"
                          disabled={loading}
                          onClick={() => promptBot("What are the rules?")}
                        >
                          What are the rules?
                        </button>
                        <button
                          className="block w-fit text-[12px] text-offBlack border border-solid border-[#00BA77] rounded-[5px] p-1.5  transition hover:opacity-60"
                          disabled={loading}
                          onClick={() =>
                            promptBot("I'm looking to do something else ")
                          }
                        >
                          I&apos;m looking to do something else
                        </button>
                      </div>
                    )}
                  </div>
                  {messages.map((msg: ChatMessage, i: number) => {
                    const isAssistant = msg.sender === "assistant";
                    const isAdmin = !isAssistant && msg.sender !== "user";
                    const messageContent = typeof msg.message === 'object' ? msg.message : null;
                    const responseHtml = messageContent?.response ?? (typeof msg.message === 'string' ? msg.message : ""); // Handle string messages too

                    return (
                      <div key={i}>
                        {msg.sender !== "user" ? (
                          <div className="flex flex-col mb-6 " > {/* Removed duplicate key */}
                            <div className="flex gap-4">
                              <span
                                className={`flex justify-center items-center capitalize text-center text-white font-semibold w-6 h-6 min-w-6 min-h-6 rounded-full overflow-hidden ${
                                  msg.user_pics ? "bg-[#D8D8D8]" : "bg-[#00BA77]"
                                }`}
                              >
                                {msg.user_pics || isAssistant ? (
                                  <img
                                    src={
                                      isAssistant
                                        ? messageContent?.fullname?.includes("George Soros")
                                          ? "https://ft9japayoutbucket3.s3.amazonaws.com/media/support_profile_images/male_profile.jpg"
                                          : messageContent?.fullname // Check if fullname exists before assuming female
                                          ? "https://ft9japayoutbucket3.s3.amazonaws.com/media/support_profile_images/female_profile.jpg"
                                          : "https://i.pinimg.com/564x/1e/71/2d/1e712d2318258083c0df91f9ec749b77.jpg" // Default assistant avatar
                                        : msg.user_pics ?? "https://via.placeholder.com/24" // Default admin avatar if pics missing
                                    }
                                    width={24} // Use actual size
                                    height={24}
                                    alt={`${msg.sender} avatar`}
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  // Display first initial if no pic and not assistant
                                  msg.user_name?.split(" ")[0]?.[0] ?? 'A' // Default to 'A' if name missing
                                )}
                              </span>

                              <div className="max-w-[80%] w-fit text-[14px] bg-[#f2f2f2] font-medium p-2 rounded-[10px] rounded-tl-none group">
                                <p className="text-[#00BA77] font-bold text-[14px] mb-2">
                                  {isAssistant
                                    ? messageContent?.fullname ?? "Hamma Chatbot"
                                    : `${msg.user_name?.split(" ")[0] ?? 'Admin'} (Admin)`}
                                </p>

                                <p
                                  className="text-[#1e1e1e]"
                                  dangerouslySetInnerHTML={{ __html: responseHtml }}
                                ></p>

                                {isAssistant && !messageContent?.chat_switched_to_admin && messageContent?.id && messageContent?.thread && (
                                    <>
                                      <p
                                        className={`text-[10px] ${
                                          messages.length - 1 === i
                                            ? "block"
                                            : "hidden"
                                        }  opacity-60 mt-2.5  group-hover:block transition`}
                                      >
                                        Generated by AI. Double check for
                                        accuracy
                                      </p>
                                      <span
                                        className={`mt-1 ${
                                          messages.length - 1 === i
                                            ? "flex"
                                            : "hidden"
                                        } items-center justify-center gap-1 w-fit  group-hover:flex transition `}
                                      >
                                        <motion.button
                                          className="flex justify-center items-center border text-[#1e1e1e] border-stone-300 border-solid rounded p-1 text-[12px] transition hover:bg-stone-400 hover:text-white"
                                          disabled={botVoteLoading}
                                          whileTap={{ scale: 1.1 }}
                                          onClick={() => {
                                            const email = getValues("email");
                                            const name = getValues("name");
                                            if (messageContent?.id && messageContent?.thread && email && name) {
                                              voteBotResponse({
                                                message: messageContent.id,
                                                vote: "upvote",
                                                thread: messageContent.thread,
                                                email,
                                                name,
                                              });
                                            } else {
                                               toast({ title: "Missing required info for voting.", variant: "destructive" });
                                            }
                                          }}
                                        >
                                          {botVoteLoading ? ( <SyncLoading size={5} color={"#151515"} /> ) : ( <LuThumbsUp /> )}
                                        </motion.button>
                                        <motion.button
                                          className="flex justify-center items-center text-[#1e1e1e] border border-stone-300 border-solid rounded p-1 text-[12px] transition hover:bg-stone-400 hover:text-white"
                                          disabled={botVoteLoading}
                                          whileTap={{ scale: 1.1 }}
                                          onClick={() => setModalCount(i)}
                                        >
                                          {botVoteLoading ? ( <SyncLoading size={5} color={"#151515"} /> ) : ( <LuThumbsDown /> )}
                                        </motion.button>

                                        <AnimatePresence initial={false} mode="wait">
                                          {modalCount === i && (
                                            <motion.div
                                              className="p-1.5 lg:p-3 rounded text-[#1e1e1e] border border-solid border-[#F2F2F2] text-[10px] mt-2"
                                              initial={{ opacity: "0" }}
                                              animate={{ opacity: 1 }}
                                              exit={{ opacity: "0" }}
                                              transition={{
                                                type: "spring",
                                                bounce: 0.3,
                                                duration: 0.4,
                                              }}
                                              ref={thumbsDownRef} // Remove cast, useOnClickOutside should provide compatible ref
                                              key={`thumbsDownRef-${i}`} // Ensure unique key
                                            >
                                              <p className="opacity-60 text-xs mb-2">
                                                Tell us more:
                                              </p>

                                              <div className="flex gap-2.5 flex-wrap">
                                                {[
                                                  "Inaccurate or incomplete",
                                                  " Was off-topic",
                                                  "Difficult to understand",
                                                  "Not useful information",
                                                  "No detail or examples",
                                                  "Broken links or references",
                                                  "Incorrect code",
                                                  "Other",
                                                ].map((feedback, i) => (
                                                  <button
                                                    className="p-1.5 text-[#1e1e1e] rounded bg-white border border-solid border-[#e8e8e8] transition hover:bg-[#e8e8e8] "
                                                    onClick={() => {
                                                      const email = getValues("email");
                                                      const name = getValues("name");
                                                      if (messageContent?.id && messageContent?.thread && email && name) {
                                                        voteBotResponse({
                                                          message: messageContent.id,
                                                          vote: "downvote",
                                                          thread: messageContent.thread,
                                                          feedback,
                                                          email,
                                                          name,
                                                        });
                                                      } else {
                                                         toast({ title: "Missing required info for voting.", variant: "destructive" });
                                                      }
                                                      setModalCount(undefined); // Use undefined for consistency
                                                    }}
                                                    key={`${i}-${feedback}`} // More specific key
                                                  >
                                                    {feedback}
                                                  </button>
                                                ))}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </span>
                                    </>
                                  )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col mb-6 items-end" > {/* Removed duplicate key */}
                            <div className="flex flex-row-reverse gap-4">
                              <div className="max-w-[80%] min-w-[35px] w-fit text-[14px] bg-[#00BA774a] text-[#1e1e1e] font-medium p-2 rounded-[10px] rounded-tr-none">
                                {/* Ensure msg.message is treated as string here */}
                                <p className="w-full">{typeof msg.message === 'string' ? msg.message : ""}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {loading && !isChatSwitchedToAdmin && (
                    <div className="flex flex-col mb-6 ">
                      <div className="flex gap-4">
                        <div className="w-6 h-6 min-w-6 min-h-6"> {/* Simplified class names */}
                          <img
                            className="w-full h-full rounded-full" // Simplified class names
                            src="https://i.pinimg.com/564x/1e/71/2d/1e712d2318258083c0df91f9ec749b77.jpg"
                            alt="Chatbot avatar"
                            width={24}
                            height={24}
                            // Removed inline style, ensure CSS handles minHeight if needed
                          />
                        </div>
                        <div className="max-w-[80%] w-fit text-[14px] bg-[#f2f2f2] font-medium p-2 rounded-[10px] rounded-tl-none"> {/* Changed p to div for loader */}
                          <SyncLoading size={10} color="#ABABAB" /> {/* Pass props */}
                        </div> {/* Correctly close the div */}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full p-1 pb-0">
                  <form
                    id="message-form"
                    onSubmit={handleSubmit}
                    className=" h-[44px] mt-2   bg-[#f2f2f2] w-full flex justify-center items-center gap-2 rounded-[5px] px-2 py-1  "
                    ref={chatRef}
                  >
                    <input
                      className="flex-1 bg-transparent text-[#1e1e1e] !outline-none !border-none hover:!outline-0  focus:!ring-transparent !px-2 min-w-[120px] sm:!px-3 "
                      type="text"
                      placeholder="What do you want to discuss?"
                      id="message-input"
                      disabled={loading}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      className={`flex justify-center items-center gap-2 py-[6px] !px-2 sm:!px-3 font-medium text-xs ${ /* Corrected text-xm to text-xs */
                        message ? "bg-[#00BA77]" : "bg-[#ABABAB]"
                      } rounded-[5px] text-white transition duration-200 hover:opacity-40 disabled:opacity-50`} // Added disabled style
                      type="submit"
                      disabled={loading || !message || !socket || socket.readyState !== WebSocket.OPEN} // More robust disabled check
                    >
                      <FiSend className="w-[20px] h-[20px]" />{" "}
                      <span className="hidden sm:flex">Send</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <form
                className="p-4 py-8 md:py-4 h-full flex justify-start flex-col  overflow-y-scroll "
                style={{ height: "calc( 100% - 80px )" }}
                onSubmit={hookHandleSubmit(submitHandler)}
              >
                <div className="mb-3 w-fit mx-auto">
                  <img
                    src={TypingChatbot} // Assuming TypingChatbot is the imported path string
                    className=""
                    alt="Chatbot illustration"
                    width={140}
                    height={140}
                    loading="lazy"
                  />
                </div>

                <p className="mb-4">
                  To send us a message, first leave us your contact information
                  so we can always get back to you.
                </p>

                <div className="formController mb-4 ">
                  <label htmlFor="name" className="font-medium">
                    Full name{" "}
                  </label>
                  <div className={`form_input`}> {/* Removed extra space */}
                    <input
                      id="name"
                      className="border-solid border-[#BEBEBE] border-[.5px] focus:!ring-transparent w-full rounded p-2" // Added common input styles
                      type="text"
                      // disabled={loading} // Let react-hook-form handle disabling if needed via formState
                      // style={{ padding: "11px 12px" }} // Use Tailwind/CSS classes instead
                      {...register("name", {
                        required: "Kindly input your name.", // Removed emoji
                      })}
                    />
                  </div>
                  {/* Use && for conditional rendering */}
                  {errors.name && (
                    <span className="desc warn text-red-500 text-xs mt-1"> {errors.name.message} </span>
                  )}
                </div>

                <div className="formController ">
                  <label htmlFor="email" className="font-medium">
                    Email Address{" "}
                  </label>
                  <div className={`form_input`}> {/* Removed extra space */}
                    <input
                      id="email"
                      className="border-solid border-[#BEBEBE] border-[.5px] focus:!ring-transparent w-full rounded p-2" // Added common input styles
                      type="email"
                      // disabled={loading}
                      // style={{ padding: "11px 12px" }}
                      {...register("email", {
                        required: "Kindly input your email.", // Removed emoji
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Invalid email address.", // Removed emoji
                        },
                      })}
                    />
                  </div>
                   {/* Use && for conditional rendering */}
                  {errors.email && (
                    <span className="desc warn text-red-500 text-xs mt-1"> {errors.email.message} </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="!text-white !bg-[#00BA77] footer_btn mt-[30px] md:mt-[60px]  mx-auto  px-4 py-3 rounded-md transition hover:opacity-60 "
                >
                  Submit
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button to toggle the chatbot visibility using context */}
      <div
        className="flex items-center justify-center rounded-full h-16 w-16 min-h-16 min-w-16 bg-[#00BA77]  border-2 border-solid border-white cursor-pointer"
        onClick={() => setIsChatbotOpen(!isChatbotOpen)} // Use context setter
      >
        {isChatbotOpen ? ( // Use context state
          <IoClose color="#fff" size={28} />
        ) : (
          <MdMessage color="#fff" size={28} />
        )}
      </div>
    </div>
  );
};

export default SupportChatbot;
