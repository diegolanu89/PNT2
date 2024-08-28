import { ComponentController } from './ComponentController.c'

export class ScreenController extends ComponentController {
	navigator

	constructor(model, navigate) {
		super(model)
		this.navigator = navigate
		if (model.timerPath !== undefined) this.timerReturn(model.timerPath.timer, model.timerPath.path)
	}

	getNavigator() {
		return this.navigator
	}

	timerReturn(t, p) {
		setTimeout(() => {
			this.navigator(p)
		}, t)
	}
}
