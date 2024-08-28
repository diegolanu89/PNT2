import consumerSessionService from '../../deviceController/sesion.Controller'
import { CODE_ERR } from '../Model/ControlErrors.m'
import { Log, LogType } from '../Model/Logger.m'
import { ComponentController } from './ComponentController.c'

export class WelcomeController extends ComponentController {
	constructor(data) {
		super(data)
	}

	init = async () => {
		await consumerSessionService.initiateSession().catch((e) => {
			Log(LogType.err, JSON.stringify(e), CODE_ERR.C16)
		})
	}

	getCarrusel() {
		return this.getModel().carrusel
	}
}
