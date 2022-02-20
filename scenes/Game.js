import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
    constructor() {
        super()
        this.ball
        this.paddleLeft
        this.paddleRight
        this.randX
        this.randY
        this.moveUp = false
        this.moveDown = false
    }
    preload() {
        this.paddleLeft = this.add.rectangle(50, 250, 20, 100, 0xffffff, 1)
        this.paddleRight = this.add.rectangle(750, 250, 20, 100, 0xffffff, 1)
        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1)
        this.randX = -200 //this.getRand()
        this.randY = 0 //this.getRand()
    }

    create() {
        // ball
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)
        this.ball.body.setCollideWorldBounds(true, 1, 1)
        this.ball.body.setVelocity(this.randX, this.randY)

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
        // handle player input
        if (this.moveUp && this.paddleLeft.y > 50) {
            this.paddleLeft.y -= 10
        }
        if (this.moveDown && this.paddleLeft.y < 450) {
            this.paddleLeft.y += 10
        }
        this.paddleLeft.body.updateFromGameObject()
    }

    render() {

    }

    getRand() {
        return Phaser.Math.Between(-200, 200)
    }
}