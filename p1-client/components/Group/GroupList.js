import { map } from 'lodash'
import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material'

export default function GroupList(props) {
  const { groups } = props
  console.log(groups)

  return (
    <div className="courseList">
      {groups !== undefined && (
        <div>
          {map(groups, (x) => {
            return <Group key={x._id} group={x} />
          })}
        </div>
      )}
    </div>
  )
}

function Group(props) {
  const { group } = props
  const { id, nombre, idioma, nivel } = group

  return (
    <Card sx={{ display: 'inline-block', margin: '20px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {idioma !== undefined && idioma.nombre}
          {bull}
          {nivel !== undefined && nivel.codigo}
        </Typography>
        <Typography variant="h5" component="div">
          {nombre}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/groups/${id}`}>
          <Button size="small" color="primary">
            Ver grupo
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)
