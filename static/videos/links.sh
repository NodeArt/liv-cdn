#!/bin/bash

# to find CDN bucket visit
# https://console.cloud.google.com/storage/browser/cdn.olo.live

# Check if an input folder is provided as a command-line argument
if [ $# -eq 1 ]; then
    input_directory="$1"
else
    input_directory="$(pwd)"
fi

# List of file extensions to process (e.g., mp4, mkv)
file_extensions=("mp4" "mkv", "mov")

# Iterate through all files in the input directory
for filename in "$input_directory"/*; do
    # Check if the file has an allowed extension
    extension="${filename##*.}"
    if [[ -f "$filename" && " ${file_extensions[@]} " =~ " $extension " ]]; then
        # Get the file name without extension
        file_name_without_extension="$(basename -- "$filename" | cut -f 1 -d '.')"

        echo https://liv-cdn.pages.dev/videos/$file_name_without_extension/master.m3u8
    fi
done
