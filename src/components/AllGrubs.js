import React from 'react'

const AllGrubs = ({grubs}) => {
  return (
    <>
    {grubs.map((grub) => (
      <div key={grub.id}>{grub.name}</div>
    ))}

    </>
  )
}

export default AllGrubs