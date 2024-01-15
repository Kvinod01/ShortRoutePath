import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LocationSearch from './LocationSearch'
import RouteMap from './RouteMap'


const StyledContainer=styled.div`
   padding-top: 100px !important;
   display: flex;
   height: 100vh;
`

function WayPoints(props) {
  return (
    <StyledContainer className="container-fluid d-flex">
        <LocationSearch />
        <RouteMap />
    </StyledContainer>
  )
}

WayPoints.propTypes = {}

export default WayPoints
