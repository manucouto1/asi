import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Grid, Image, Input } from 'semantic-ui-react'
import Link from 'next/link'

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid>
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image
          src="/images/brand3/facebook_cover_photo_1.png"
          alt="Biblio udc"
        />
      </a>
    </Link>
  )
}

function Search() {
  const [searchStr, setSearchstr] = useState('')
  const router = useRouter()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (load) {
      router.push(`/search?query=${searchStr}`)
    }
    setLoad(true)
  }, [searchStr])

  return (
    <Input
      id="search-good"
      icon={{ name: 'search' }}
      value={router.query.query || ''}
      onChange={(_, data) => setSearchstr(data.value)}
    />
  )
}
