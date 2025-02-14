import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <input type="text" id='userId' placeholder='id' />
      <input type="password" id='password' placeholder='password' />
    </div>
  )
}

export default Page