import Avatar from 'components/Avatar'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'

const index = ({ name, social, description, link, logo }) => {
  return (
    <Card className='p-3'>
      <div className='flex items-center space-x-2'>
        <Avatar src={logo} alt={name} className='w-12 rounded-lg' />
        <div>
          <Typography className='font-bold'>{name}</Typography>
          <Typography className='text-xs'>{social}</Typography>
        </div>
      </div>
      {description === '' ? null : <Typography className='mt-3 mb-3'>{description}</Typography>}
      <div className='flex justify-center'>
        <a href={link} target='blank' className='w-full'>
          <Button>გადასვლა</Button>
        </a>
      </div>
    </Card>
  )
}

export default index
