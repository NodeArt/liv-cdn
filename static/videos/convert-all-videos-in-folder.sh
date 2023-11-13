#!/bin/bash

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
        echo file_name_without_extension: ${file_name_without_extension}

        # Create a directory for storing processed videos
        output_directory="$input_directory/$file_name_without_extension"
        echo output_directory: ${output_directory}
        mkdir -p "$output_directory"

        # Build the ffmpeg command
        echo filename: ${filename}
        ffmpeg -i "$filename" \
        -filter_complex \
        "[0:v]split=3[v1][v2][v3]; \
        [v1]scale=w=720:h=1280[v1out]; [v2]scale=w=576:h=1024[v2out]; [v3]scale=w=464:h=848[v3out]" \
        -map "[v1out]" -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 5M -maxrate:v:0 5M -minrate:v:0 5M -bufsize:v:0 10M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
        -map "[v2out]" -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 3M -maxrate:v:1 3M -minrate:v:1 3M -bufsize:v:1 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
        -map "[v3out]" -c:v:2 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:2 1M -maxrate:v:2 1M -minrate:v:2 1M -bufsize:v:2 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
        -map a:0 -c:a:0 aac -b:a:0 96k -ac 2 \
        -map a:0 -c:a:1 aac -b:a:1 96k -ac 2 \
        -map a:0 -c:a:2 aac -b:a:2 48k -ac 2 \
        -f hls \
        -hls_time 2 \
        -hls_playlist_type vod \
        -hls_flags independent_segments \
        -hls_segment_type mpegts \
        -hls_segment_filename "$file_name_without_extension/stream_%v/data%02d.ts" \
        -hls_base_url "https://liv-cdn.pages.dev/videos/" \
        -use_localtime_mkdir 1 \
        -master_pl_name "master.m3u8" \
        -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" "$output_directory/stream_%v.m3u8"

        echo "Processing completed for $filename"
    fi
done
