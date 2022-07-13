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


/*const circle = this.assets.createCylinderMesh('circle', 0.1, 0.4, 'y', 8);
const square = this.assets.createBoxMesh('square', 0.70, 0.2, 0.70);
const whiteMaterial = this.assets.createMaterial("white", {
	color: MRE.Color3.White()
});
const coster2 = MRE.Actor.Create(this.context, {
	actor: {
		name: 'coster2',
		appearance: { meshId: circle.id, enabled: true, materialId: whiteMaterial.id },
		grabbable: false,
		collider: {
			isTrigger: true,
			geometry: {
				shape: MRE.ColliderType.Box,
				center: { x: 0, y: 0, z: 0 },
				size: { x: 1, y: 1, z: 1 }
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
		transform: {
			app: {
				rotation: { x: 0, y: 0, z: 0 },
				position: { x: 2, y: 2, z: 0 }
			}
		}
	},
})*/

/*const coster3dModel = await this.assets.loadGltf('coster.glb', 'box');
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
*//*coster.collider.onCollision('collision-enter', (actor: any) => {
	console.log(actor)
})*//*

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
})*/
