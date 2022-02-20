import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
    constructor() {
        super()
        this.ball
        this.paddleLeft
        this.randX
        this.randY
        this.moveUp = false
        this.moveDown = false
    }
    preload() {
        this.paddleLeft = this.add.rectangle(50, 250, 20, 100, 0xffffff, 1)
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

        // paddle left
        this.physics.add.existing(this.paddleLeft, true)

        // colliders
        this.physics.add.collider(this.paddleLeft, this.ball)

        /*
        this.physics.add.collider(paddleLeft, ball, (p, b) => {
            console.log('ball collided with left paddle')
        })

        const paddleRight = this.add.rectangle(750, 250, 20, 100, 0xffffff, 1)
        this.physics.add.existing(paddleRight, true)
        this.physics.add.collider(paddleRight, ball, (p, b) => {
            console.log('ball collided with right paddle')
        })
        */

        // add smooth movement
        this.input.keyboard.on('keydown-W', () => this.moveUp = true)
        this.input.keyboard.on('keyup-W', () => this.moveUp = false)
        this.input.keyboard.on('keydown-S', () => this.moveDown = true)
        this.input.keyboard.on('keyup-S', () => this.moveDown = false)
    }

    update() {
        // add controls
        if (this.moveUp && this.paddleLeft.y > 50) {
            this.paddleLeft.y -= 10
        }
        if (this.moveDown && this.paddleLeft.y < 450) {
            this.paddleLeft.y += 10
        }
        this.paddleLeft.body.updateFromGameObject() 
        /*
        this.input.keyboard.on('keydown-W', (e) => {
            if (this.paddleLeft.y > 50) {
                //this.paddleLeft.setY(this.paddleLeft.y - 10)
                this.paddleLeft.y -= 1
                this.paddleLeft.body.updateFromGameObject()
            }
        })

        this.input.keyboard.on('keydown-S', (e) => {
            if (this.paddleLeft.y < 450) {
                //this.paddleLeft.setY(this.paddleLeft.y + 10)
                this.paddleLeft.y += 1
                this.paddleLeft.body.updateFromGameObject()
            }
        })
        */
    }

    render() {

    }

    getRand() {
        return Phaser.Math.Between(-200, 200)
    }
}