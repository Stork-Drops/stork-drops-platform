import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import { BiSun, BiMoon } from "react-icons/bi";

const DarkModeSwitch = () =>{
    const { setTheme } = useNextTheme();
    const { isDark } = useTheme();

    return(
        <Switch
            className="mx-5"
            shadow
            size="sm"
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            iconOn={<BiMoon/>}
            iconOff={<BiSun/>}
        />
    )
}

export default DarkModeSwitch
