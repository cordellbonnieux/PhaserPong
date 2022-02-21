import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
    constructor() {
        super()
        this.playing
        this.ball
        this.paddleLeft
        this.paddleRight
        this.moveUp = false
        this.moveDown = false
        this.score = {
            player: 0,
            ai: 0,
            text: ''
        }
    }
    preload() {
        this.paddleLeft = this.add.rectangle(50, 250, 20, 100, 0xffffff, 1)
        this.paddleRight = this.add.rectangle(750, 250, 20, 100, 0xffffff, 1)
        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1)
        this.score.text = this.add.text(290, 10, `Player: ${this.score.player} Computer: ${this.score.ai}`)

        // maybe start with the screen?
        this.playing = true
    }

    create() {
        // ball
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)
        this.ball.body.setCollideWorldBounds(true, 1, 1)
        this.ball.body.setVelocity(-(this.getRand()), this.getRand())

        // add paddles
        this.physics.add.existing(this.paddleLeft, true)
        this.physics.add.existing(this.paddleRight, true)

        // colliders
        this.physics.add.collider(this.paddleLeft, this.ball)
        this.physics.add.collider(this.paddleRight, this.ball)

        // add smooth paddle movement
        this.input.keyboard.on('keydown-W', () => this.moveUp = true)
        this.input.keyboard.on('keyup-W', () => this.moveUp = false)
        this.input.keyboard.on('keydown-S', () => this.moveDown = true)
        this.input.keyboard.on('keyup-S', () => this.moveDown = false)
    }

    update() {
        // while the game is in playing mode
        if (this.playing) {

            // handle player input
            if (this.moveUp && this.paddleLeft.y > 50) {
                this.paddleLeft.y -= 10
            }
            if (this.moveDown && this.paddleLeft.y < 450) {
                this.paddleLeft.y += 10
            }
            this.paddleLeft.body.updateFromGameObject()

            // AI paddle to follow ball
            const num = Phaser.Math.Between(1,100)
            const move = num > 50 ? true : false
            if (move && this.ball.x > 400 && this.ball.body.velocity.x > 0) {
                if (this.paddleRight.y > this.ball.y) {
                    this.paddleRight.y -= 5
                } else if (this.paddleRight.y < this.ball.y) {
                    this.paddleRight.y += 5
                }
                this.paddleRight.body.updateFromGameObject()
            }

            // adjust score based on ball pos
            if (this.ball.body.x == 0 || this.ball.body.x == 800) {
                if (this.ball.body.x == 0) {
                    this.score.ai += 1
                } else if (this.ball.body.x == 800) {
                    this.score.player += 1
                }
                // update score
                this.score.text.setText(`Player: ${this.score.player} Computer: ${this.score.ai}`)
                this.playing = false
            }
        } else {
            // freeze and center the ball
            this.ball.body.setVelocity(0, 0)
            this.ball.body.x = 400
            this.ball.body.y = 250
                // spawn 'click anywhere for next round' box
                // add event listener, then hide it
        }

    }

    getRand() {
        return Phaser.Math.Between(200, 300)
    }
}