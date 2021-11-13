import style from './Header.module.scss'
import TopBar from './TopBar'
import Menu from './Menu'

export default function Header() {
  return (
    <div className={style.header}>
      <TopBar />
      <Menu />
    </div>
  )
}
