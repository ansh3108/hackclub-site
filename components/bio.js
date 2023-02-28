import { Box, Flex, Grid, Text, Avatar, Card } from 'theme-ui'
import Icon from '@hackclub/icons'
import { useState } from 'react'

export default function Bio({ popup = true, ...props }) {
  let { img, name, teamRole, pronouns, text, subrole, href } = props
  const [expand, setExpand] = useState(false)
  return (
    <>
      <Card
        bg="snow"
        p={popup ? [2, 2, 2] : [3, 3, 3]}
        py={popup ? [3, 3, 3] : [4, 4, 4]}
        sx={{
          display: 'flex',
          alignItems: popup ? 'center' : 'flex-start',
          transition: 'transform 0.125s ease-in-out',
          '&:hover':
            (text && popup) || href ? { transform: 'scale(1.025)' } : {},
          cursor: (text && popup) || href ? 'pointer' : null,
          textDecoration: 'none',
          maxWidth: '600px',
          zIndex: !popup ? 1003 : 5,
          maxHeight: '90vh',
          overflowY: 'scroll',
          overscrollBehavior: 'contain',
        }}
        as={href && !text ? 'a' : 'div'}
        href={href}
        target="_blank"
        onClick={() => {
          if (text && popup) {
            setExpand(true)
          }
        }}
      >
        <Avatar
          size={64}
          width={64}
          height={64}
          mr={3}
          src={
            img ||
            require(`../public/team/${name.split(' ')[0].toLowerCase()}.jpg`)
          }
          alt={name}
          sx={{
            overflow: 'hidden',
            objectFit: 'cover',
            transition: 'transform 0.125s ease-in-out',
            '&:hover': { transform: 'rotate(-8deg) scale(1.25)' },
            flexShrink: 0,
            width: '64px',
            height: '64px'
          }}
        />
        <Box>
          <Text sx={{ fontSize: [3, 3, 3] }} variant="headline" color="black">
            {name}
          </Text>
          <Flex>
            <Text>
              <Text
                color="#24B5A5"
                variant="subheadline"
                fontSize={2}
                sx={{
                  mb: ['0px', '0px', '0px'],
                  fontSize: '1.1em',
                  width: 'fit-content'
                }}
              >
                {teamRole}
              </Text>
              {subrole && (
                <>
                  <br />
                  <Text
                    color="#24B5A5"
                    sx={{
                      mb: ['0px', '0px', '0px'],
                      fontSize: 1,
                      fontWeight: 400,
                      width: 'fit-content'
                    }}
                  >
                    {subrole}
                  </Text>
                </>
              )}
              {pronouns && (
                <Text fontSize={1} ml={1} color="muted" align="center">
                  ({pronouns})
                </Text>
              )}
            </Text>
          </Flex>
          {popup == false && (
            <Text mt={2} mb={0} color="black">
              {text}
            </Text>
          )}
          {popup == false && href && (
            <Flex sx={{ alignItems: 'center' }}>
              <Text
                sx={{
                  transform: 'translateX(-4px) translateY(2px)',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                <Icon glyph="external-fill" size={24} />
              </Text>
              <Text
                mt={1}
                mb={0}
                color="black"
                as={'a'}
                href={href}
                sx={{ transform: 'translateX(-2px)' }}
              >
                {href}
              </Text>
            </Flex>
          )}
        </Box>
      </Card>
      {popup == true && expand && (
        <>
          <Flex
            sx={{
              position: 'fixed',
              zIndex: 1001,
              top: 0,
              left: 0,
              height: '100vh',
              width: '100vw',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.6)',
              pb: 4
            }}
          >
            <Bio {...props} popup={false} />
          </Flex>
          <Flex
            sx={{
              position: 'fixed',
              zIndex: 1002,
              top: 0,
              left: 0,
              height: '100vh',
              width: '100vw',
              alignItems: 'center',
              justifyContent: 'center',
              pb: 4
            }}
            onClick={() => setExpand(false)}
          ></Flex>
          
        </>
      )}
    </>
  )
}
