const app = Vue.createApp({
    data(){
        return {
            //number introduced by user
            numGuessed: undefined,
            //last guessed number by user
            lastGuessed: '',
            //random number to guess
            numToGuess: Math.floor(Math.random() * 100 + 1),
            //String were we are gonna concatenete the wrong guesses of the user
            guesses: '',
            //Number of guesses user has to get the right number
            remain: 10,
            //Variable we will use later on to display the Play Again message
            playAgain: true
        }
    },

    methods: {
        //We create the method checkGuess to check the number user inputed 
        checkGuess(){
            //First we update the last guess number with the one user just isnerted
            this.lastGuessed = this.numGuessed

            //If the number guessed by the user is not equal to the randomized number
            if(this.numGuessed != this.numToGuess){
                //first we check if we still have guesses left, and if not we display the Play Again message but changing it to false
                if(this.remain < 1){
                    this.playAgain = !this.playAgain
                } 
                //otherwise we rest one guess and we add the guessed number to the 'guesses' string that we display on the html file
                else {
                    this.remain -= 1
                    this.guesses += this.numGuessed + ' '
                }
            } 
            //And if the number is guessed correctly before guesses reach 0, we already display the Play Again message
            else {
                this.playAgain = !this.playAgain
            }
        },

        //With this method, we reset all the variables to the same ones at the start of the game. This method is called with a click on the 29th line of the HTML.
        resetGame(){
            this.numGuessed = undefined
            this.lastGuessed = ''
            this.numToGuess = Math.floor(Math.random() * 100 + 1)
            this.guesses = ''
            this.remain = 10
            this.playAgain = true
        }
    },

    computed: {
        //With this computed method, we show depending of the guessed number one message or another
        showResult(){
            //If the last guessed number is smaller than the number to guess
            if(this.lastGuessed < this.numToGuess){
                return 'Too Low! Try Again'
            } 
            //If the last guessed number is bigger than the number to guess
            else if(this.lastGuessed > this.numToGuess){
                return 'Too High! Try Again'
            } 
            //If guesses went down to 0, we showed we lost
            else if(this.remain < 0){
                return 'YOU LOST, what a noob...'
            } 
            //Otherwise, we won the game!
            else {
                return "YOU WON, probably you're really lucky"
            }
        },

        //We use this computed method to show the messages from the showResult method, and we just telling that when 'lastGuessed' has some value on it, then we display the message. This is done just to not see the message when the application is initialized
        showMessage(){
            return this.lastGuessed
        }
    }
})

app.mount('#wrapper')