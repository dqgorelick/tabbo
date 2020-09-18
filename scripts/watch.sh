#!/usr/bin/env bash

set -f

watchman --version 2>&1 > /dev/null

if (( $? != 0 )); then
	printf "Requires watchman for watching - please install it and try again\n"
	exit 1;
fi

DIR="$(pwd)/.watchman"

mkdir -p $DIR
touch "$DIR/log"
LOGFILE="$DIR/log"
PIDFILE="$DIR/pid"
SOCKFILE="$DIR/sock"
STATEFILE="$DIR/state"

watchman --statefile=$STATEFILE \
	--logfile=$LOGFILE \
	--sockname=$SOCKFILE \
	--pidfile=$PIDFILE \
	get-pid

watchman --sockname=$SOCKFILE watch ./

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "components",
		"expression": ["match", "src/components/*.ts", "wholename"],
		"command": ["./scripts/build-components.sh"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF


watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "scripts",
		"expression": ["match", "src/scripts/*.ts", "wholename"],
		"command": ["./scripts/build-scripts.sh"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "scripts-background",
		"expression": ["match", "src/scripts/background/*.ts", "wholename"],
		"command": ["./scripts/build-scripts.sh", "background"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "scripts-manager",
		"expression": ["match", "src/scripts/manager/*.ts", "wholename"],
		"command": ["./scripts/build-scripts.sh", "manager"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "scripts-popup",
		"expression": ["match", "src/scripts/popup/*.ts", "wholename"],
		"command": ["./scripts/build-scripts.sh", "popup"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "scripts-configuration",
		"expression": ["match", "src/scripts/configuration/*.ts", "wholename"],
		"command": ["./scripts/build-scripts.sh", "configuration"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "html",
		"expression": ["match", "src/*.html", "wholename"],
		"command": ["./scripts/build-html.sh"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "styles",
		"expression": ["match", "src/styles/*.html", "wholename"],
		"command": ["./scripts/build-styles.sh"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "images",
		"expression": ["match", "src/images/*.html", "wholename"],
		"command": ["./scripts/build-images.sh"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

watchman --sockname=$SOCKFILE -j <<-EOF
[
	"trigger",
	"./",
	{
		"name": "manifest",
		"expression": ["match", "manifest.json", "wholename"],
		"command": ["./scripts/build-manifest.sh"],
		"append_files": false,
		"stdin": ["name", "exists", "new", "size", "mode"],
		"stdout": ">>$LOGFILE",
		"stderr": ">>$LOGFILE"
	}
]
EOF

trap "watchman --sockname=$SOCKFILE shutdown-server" SIGTERM SIGINT

tail -f "$LOGFILE"
