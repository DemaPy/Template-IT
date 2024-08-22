import { Route } from '@/constance/routes'
import { Link, useLocation } from 'react-router-dom'

type NavItemProps = {
    route: Route
}
const defaultClass = "font-semibold text-sm text-slate-900"
const activeClass = "underline underline-offset-4"
const NavItem = ({ route }: NavItemProps) => {
    const location = useLocation()
    const computeClassName = location.pathname.includes(route.path) ? defaultClass + " " + activeClass : defaultClass
    return (
        <Link to={route.path} className={computeClassName}>
            {route.title}
        </Link>
    )
}

export default NavItem