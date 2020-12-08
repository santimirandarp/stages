node node_modules/nodemon/bin/nodemon.js &
echo "executing sass"
sass resources/scss/:resources/css/ --watch &
echo "sass executed"
