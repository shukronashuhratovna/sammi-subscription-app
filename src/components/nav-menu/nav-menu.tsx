import { Button, Fade, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useState } from 'react'

import React from 'react'

const NavMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(evt.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }


    return (
        <div className='md:!hidden'>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='!text-white capitalize'>
                Browse
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                className={'menu'}
            >
                <MenuItem>Home</MenuItem>
                <MenuItem>Movies</MenuItem>
                <MenuItem>TV Shows</MenuItem>
                <MenuItem>New</MenuItem>
                <MenuItem>Popular</MenuItem>
            </Menu>
        </div>
    )
}

export default NavMenu