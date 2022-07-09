import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default function(this: any) {
	MRE.Animation.AnimateTo(this.context, this.cube, {
		destination: { transform: { local: { scale: { x: 0.4, y: 0.4, z: 0.4 } } } },
		duration: 0.3,
		easing: MRE.AnimationEaseCurves.EaseOutSine
	});
}
