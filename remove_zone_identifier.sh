#!/bin/bash
# This script removes all files in the current directory and subdirectories whose names contain ':Zone.Identifier'

find . -type f -name '*:Zone.Identifier*' -print -exec rm -f {} \;
