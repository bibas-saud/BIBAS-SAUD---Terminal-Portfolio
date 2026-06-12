import help from './help'
import clear from './clear'
import whoami from './whoami'
import date from './date'
import banner from './banner'
import history from './history'
import about from './about'
import skills from './skills'
import projects from './projects'
import resume from './resume'
import contact from './contact'
import settings from './settings'
import stats from './stats'

export function registerAllCommands(registerCommands) {
  registerCommands({
    help,
    clear,
    whoami,
    date,
    banner,
    history,
    '/about': about,
    '/skills': skills,
    '/projects': projects,
    '/resume': resume,
    '/contact': contact,
    '/settings': settings,
    '/stats': stats,
  })
}
