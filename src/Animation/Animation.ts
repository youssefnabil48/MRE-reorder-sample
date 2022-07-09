import * as MRE from '@microsoft/mixed-reality-extension-sdk'

/**
	 * Generate keyframe data for a simple spin animation.
	 * @param duration The length of time in seconds it takes to complete a full revolution.
	 * @param axis The axis of rotation in local space.
	 */
export function generateSpinKeyframes(duration: number, axis: MRE.Vector3): Array<MRE.Keyframe<MRE.Quaternion>> {
	return [{
		time: 0 * duration,
		value: MRE.Quaternion.RotationAxis(axis, 0)
	}, {
		time: 0.25 * duration,
		value: MRE.Quaternion.RotationAxis(axis, Math.PI / 2)
	}, {
		time: 0.5 * duration,
		value: MRE.Quaternion.RotationAxis(axis, Math.PI)
	}, {
		time: 0.75 * duration,
		value: MRE.Quaternion.RotationAxis(axis, 3 * Math.PI / 2)
	}, {
		time: 1 * duration,
		value: MRE.Quaternion.RotationAxis(axis, 2 * Math.PI)
	}];
}
