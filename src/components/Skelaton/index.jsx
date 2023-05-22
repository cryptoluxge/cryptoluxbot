import PropTypes from 'prop-types'

const index = ({ width, height }) => {
  return <div className={`duration-150 animate-pulse h-${height} w-${width} rounded-md bg-zinc-300 dark:bg-zinc-600`}></div>
}

index.defaultProps = {
  width: '10',
  height: '4',
}

index.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}

export default index
