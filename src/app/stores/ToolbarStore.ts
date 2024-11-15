import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";


export type ToolbarState = {
  isDark : boolean,
  isOpenDialogThemes : boolean,
}

const initialState : ToolbarState = {
  isDark : false,
  isOpenDialogThemes : false,
}




export const ToolbarStore = signalStore(
  { providedIn: 'root' },
  withState<ToolbarState>(initialState),
  withMethods(
    (state) => ({
      toggleDark(){
        const isDark = !state.isDark()
        patchState(state,{ isDark })
        this.setTheme(isDark)
      },
      restoreStorageIsDark(){
        const isDark = localStorage.getItem('isDark') === 'true' ? true : false
        patchState(state,{ isDark })
        this.setTheme(isDark)
      },
      setTheme(isDark : boolean){
        console.log({isDark})
        localStorage.setItem('isDark',String(isDark))
        let themeLink = document.getElementById('app-theme') as HTMLLinkElement;

        if (themeLink) {
            themeLink.href = isDark ? 'dark.css' : `ligth.css`;
            // themeLink.href = `avalon_light_yellow.css`;
        }
      },
      showThemes(){
        patchState(state,{ isOpenDialogThemes : true })
      },
      hideThemes(){
        patchState(state,{ isOpenDialogThemes : false })
      }
    })
  )
)
