import Avatar from 'components/Avatar'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'

const index = ({ name, category, description, link, logo }) => {
  return (
    <Card className='p-2'>
      <div className='flex items-center space-x-2'>
        <Avatar src={logo} alt={name} className='w-12 rounded-lg' />
        <div>
          <Typography className='font-bold'>{name}</Typography>
          <Typography className='text-sm'>{category}</Typography>
        </div>
      </div>
      <Typography className='py-3 text-sm'>{description}</Typography>
      <div className='flex justify-center'>
        <a href={link} target='blank' className='w-full'>
          <Button>საიტის ნახვა</Button>
        </a>
      </div>
    </Card>
  )
}

export default index
