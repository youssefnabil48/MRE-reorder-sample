/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import CubeBottonOnHoverEnterHandler from './Handlers/CubeBottonOnHoverEnterHandler';
import CubeBottonOnHoverExitHandler from './Handlers/CubeBottonOnHoverExitHandler';
import { generateSpinKeyframes } from './Animation/Animation';

/**
 * The main class of this app. All the logic goes here.
 */
export default class HelloWorld {
	private text: MRE.Actor = null;
	private cube: MRE.Actor = null;
	private assets: MRE.AssetContainer;
	private ball: MRE.Actor
	private dna: MRE.Actor

	constructor(private context: MRE.Context) {
		// this.context.onStarted(() => this.started());
		this.context.onStarted(() => this.startTest());
	}

	private async startTest() {
		this.assets = new MRE.AssetContainer(this.context);

		const coster3dModel = await this.assets.loadGltf('coster.glb', 'box');
		const coster = MRE.Actor.CreateFromPrefab(this.context, {
			// Use the preloaded glTF for each box
			firstPrefabFrom: coster3dModel,
			// Also apply the following generic actor properties.
			actor: {
				name: 'Altspace Coster',
				transform: {
					local: {
						position: { x: 0, y: 0, z: 0 },
						scale: { x: 2, y: 2, z: 2 }
					}
				},
				grabbable: false,
				rigidBody: {
					useGravity: true,
					collisionDetectionMode: MRE.CollisionDetectionMode.Continuous,
					detectCollisions: true,
				},
				subscriptions: ['transform', 'rigidbody'],
			},
		});
		coster.onGrab('end', (user, data) => {
			console.log('end ', coster.transform.app.toJSON())
		})

		const dna3dModel = await this.assets.loadGltf('dna.glb', 'box');
		const dna = MRE.Actor.CreateFromPrefab(this.context, {
			// Use the preloaded glTF for each box
			firstPrefabFrom: dna3dModel,
			// Also apply the following generic actor properties.
			actor: {
				name: 'Altspace Dna',
				parentId: coster.id,
				transform: {
					local: {
						position: { x: 0, y: 0, z: 0 }
					}
				},
				grabbable: true,
				rigidBody: {
					useGravity: true,
					collisionDetectionMode: MRE.CollisionDetectionMode.Continuous,
					detectCollisions: true,
				},
				subscriptions: ['transform', 'rigidbody'],
			},
		});
		dna.onGrab('end', (user, data) => {
			console.log('end ', dna.transform.local.toJSON())
		})

		/*const circle = this.assets.createCylinderMesh('circle', 0.1, 0.4, 'y', 8);
		const square = this.assets.createBoxMesh('square', 0.70, 0.2, 0.70);
		const blackMaterial = this.assets.createMaterial("blackmat", {
			color: MRE.Color3.Black()
		});
		const coster = MRE.Actor.Create(this.context, {
			actor: {
				name: 'coster',
				appearance: { meshId: circle.id, enabled: true, materialId: blackMaterial.id },
				grabbable: false,
				collider: {
					isTrigger: true,
					geometry: {
						shape: MRE.ColliderType.Sphere,
						radius: 0.5
					},
					bounciness: 2,
					enabled: true
				},
				rigidBody: {
					useGravity: true,
					collisionDetectionMode: MRE.CollisionDetectionMode.Continuous,
					detectCollisions: true,
					enabled: true,
					mass: 1
				},
				subscriptions: ['transform', 'rigidbody'],
				transform: { app: { rotation: { x: 0, y: 0.5, z: 0 } } }
			},
		})*/

		// const ball = MRE.Actor.CreatePrimitive(this.assets, {
		// 	definition: {
		// 		dimensions: {x: 2, y: 2, z: 2},
		// 		shape: MRE.PrimitiveShape.Sphere,
		// 	},
		// 	actor: {
		// 		name: 'box',
		// 		grabbable: true,
		// 	},
		// 	addCollider: true,
		// })

		// ball.subscribe('transform')
		// ball.onGrab('end', () => {
		// 	console.log(ball.transform.local.position.toJSON())
		// })

	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private async started() {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		// Create a new actor with no mesh, but some text.
		this.text = MRE.Actor.Create(this.context, {
			actor: {
				name: 'Text',
				transform: {
					app: { position: { x: 0, y: 0.5, z: 0 } }
				},
				text: {
					contents: "Hello World!",
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.3
				}
			}
		});

		// Here we create an animation for our text actor. First we create animation data, which can be used on any
		// actor. We'll reference that actor with the placeholder "text".
		const spinAnimData = this.assets.createAnimationData(
			// The name is a unique identifier for this data. You can use it to find the data in the asset container,
			// but it's merely descriptive in this sample.
			"Spin",
			{
				// Animation data is defined by a list of animation "tracks": a particular property you want to change,
				// and the values you want to change it to.
				tracks: [{
					// This animation targets the rotation of an actor named "text"
					target: MRE.ActorPath("text").transform.local.rotation,
					// And the rotation will be set to spin over 20 seconds
					keyframes: generateSpinKeyframes(20, MRE.Vector3.Up()),
					// And it will move smoothly from one frame to the next
					easing: MRE.AnimationEaseCurves.Linear
				}]
			});
		// Once the animation data is created, we can create a real animation from it.
		spinAnimData.bind(
			// We assign our text actor to the actor placeholder "text"
			{ text: this.text },
			// And set it to play immediately, and bounce back and forth from start to end
			{ isPlaying: true, wrapMode: MRE.AnimationWrapMode.PingPong }
		);

		// Load a glTF model before we use it
		const cubeData = await this.assets.loadGltf('altspace-cube.glb', "box");

		// spawn a copy of the glTF model
		this.cube = MRE.Actor.CreateFromPrefab(this.context, {
			// using the data we loaded earlier
			firstPrefabFrom: cubeData,
			// Also apply the following generic actor properties.
			actor: {
				name: 'Altspace Cube',
				// Parent the glTF model to the text actor, so the transform is relative to the text
				parentId: this.text.id,
				transform: {
					local: {
						position: { x: 0, y: -1, z: 0 },
						scale: { x: 0.4, y: 0.4, z: 0.4 }
					}
				}
			}
		});

		this.cube.grabbable = true

		// Create some animations on the cube.
		const flipAnimData = this.assets.createAnimationData(
			// the animation name
			"DoAFlip",
			{
				tracks: [{
					// applies to the rotation of an unknown actor we'll refer to as "target"
					target: MRE.ActorPath("target").transform.local.rotation,
					// do a spin around the X axis over the course of one second
					keyframes: generateSpinKeyframes(1.0, MRE.Vector3.Right()),
					// and do it smoothly
					easing: MRE.AnimationEaseCurves.Linear
				}]
			}
		);
		// apply the animation to our cube
		const flipAnim = await flipAnimData.bind({ target: this.cube });

		// Set up cursor interaction. We add the input behavior ButtonBehavior to the cube.
		// Button behaviors have two pairs of events: hover start/stop, and click start/stop.
		const buttonBehavior = this.cube.setBehavior(MRE.ButtonBehavior);

		// Trigger the grow/shrink animations on hover.
		buttonBehavior.onHover('enter', CubeBottonOnHoverEnterHandler);
		buttonBehavior.onHover('exit', CubeBottonOnHoverExitHandler);

		// When clicked, do a 360 sideways.
		buttonBehavior.onClick(_ => {
			flipAnim.play();
		});
	}
}
