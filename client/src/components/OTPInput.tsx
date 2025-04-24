import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input'; // Assuming Shadcn UI Input component
import { cn } from '@/lib/utils'; // Assuming Shadcn UI utility function

interface OTPInputProps {
  length?: number;
  onChange: (otp: string) => void;
  disabled?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onChange, disabled = false }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    // Allow only digits and limit to 1 character
    if (!/^\d*$/.test(value)) {
      return; // Prevent non-digit input
    }

    const newOtp = [...otp];
    // Allow only one digit per input
    newOtp[index] = value.slice(-1); // Take only the last digit entered
    setOtp(newOtp);

    // Emit the complete OTP string
    onChange(newOtp.join(''));

    // Move focus to the next input if a digit was entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus to the previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, ''); // Remove non-digits
    if (pasteData.length === length) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      onChange(pasteData);
      // Optionally focus the last input or a submit button
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2" onPaste={handlePaste}>
      {otp.map((data, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="tel" // Use tel for numeric keyboard on mobile
          maxLength={1}
          value={data}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className={cn(
            'w-12 h-14 md:w-14 md:h-16', // Responsive sizing
            'text-center text-2xl md:text-3xl font-semibold',
            'border-2 border-gray-300 rounded-md',
            'focus:border-green-500 focus:ring-1 focus:ring-green-500', // Use #00BA77 equivalent (adjust if needed)
            'transition duration-200 ease-in-out',
            'bg-white', // White background
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          )}
          inputMode="numeric" // Hint for numeric keyboard
          autoComplete="one-time-code" // Improve UX with OTP autofill
        />
      ))}
    </div>
  );
};

export default OTPInput;
