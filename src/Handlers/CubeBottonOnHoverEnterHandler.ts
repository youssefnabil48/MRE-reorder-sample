import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default function(this: any) {
	// use the convenience function "AnimateTo" instead of creating the animation data in advance
	MRE.Animation.AnimateTo(this.context, this.cube, {
		destination: { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } },
		duration: 0.3,
		easing: MRE.AnimationEaseCurves.EaseOutSine
	});
}
