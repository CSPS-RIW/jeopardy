# Quiz Game (Jeopardy)

Welcome to the Quiz Game (Okay, it's sort of like Jeopardy).

This application is a quiz game that asks the player to answer questions, and will add or deduct points from their score, and will show their score at the end of the game.

It uses the Table API to allow you to add categories and questions directly in the Brightspace editor. You probably don't want to add too many questions/categories for a single player game.

Speaking of, you can make the game single-player or multi-player by changing the data-game-mode attribute on the div with the id of app. Multi-player games have at least 2 players and at most 4 players. You can change those parameters in playerStore.js in the addPlayer method.

## Accessibility

I have done my own accessibility testing, and I will have it tested by the Accessibility team soon. Do your own testing, and if you are changing styles or content/features, make sure to recheck accessibility.

## Questions, Comments, Enhancements

If you have any questions or comments, please contact me on Teams or by email. For enhancements, submit a PR and I will review them.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
