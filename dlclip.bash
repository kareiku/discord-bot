if [ -z $1 ] || [ -z $2 ] || [ -z $3 ]
then echo "Usage: $0 STARTTIME ENDTIME URL\nTime format: \"hh:mm:ss.s\"\n"
else yt-dlp --downloader ffmpeg --downloader-args "ffmpeg_i:-ss $1 -to $2" $3
fi
