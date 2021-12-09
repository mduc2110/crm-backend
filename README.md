# crm-backend

## SETUP BABEL

npm install --save-dev babel-cli babel-preset-env babel-preset-es2015 babel-preset-stage-2 nodemon

touch .babelrc
{
"presets": ["env", "stage-2", "es2015"]
}

add this to package.json

"start": "nodemon ./server.js --exec babel-node -e js"
