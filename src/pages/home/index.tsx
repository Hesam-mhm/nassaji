// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { socket } from 'src/configs/mqttConfig'
import { ReactSVG } from 'react-svg'
import { CircularProgress, Stack } from '@mui/material'

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [isLoading, setIsLoading] = useState(false)
  const [monitoringData, setSocketData] = useState<any | null>(null)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDataReceived(receivedData: any) {
      console.log(receivedData)
      console.log(socket.on)

      setSocketData(receivedData)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('product', onDataReceived)
    socket.on('disconnect', onDisconnect)
    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    // Check if running on the client side before accessing `document`
    if (typeof window !== 'undefined') {
      const svgElement = document.querySelector('.svg-container svg')
      if (svgElement) {
        svgElement.addEventListener('click', () => {
          console.log('SVG clicked')
        })
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        const svgElement = document.querySelector('.svg-container svg')
        if (svgElement) {
          svgElement.removeEventListener('click', () => {})
        }
      }
    }
  }, [])

  const changeMotorsColor = (svg: SVGSVGElement) => {
    const value = monitoringData.f ? monitoringData.f : 0

    let color = ''

    if (value === 0) {
      color = '#FF0000'
    } else {
      color = '#e2e2e2'
    }

    const motor = svg.getElementById('_99-2') as SVGGraphicsElement
    console.log(motor)

    if (motor) {
      // motor.setAttribute('stroke', color)
      // motor.setAttribute('stroke-width', color)
      if (motor.tagName === 'rect' || motor.tagName === 'circle' || motor.tagName === 'path') {
        motor.setAttribute('fill', color)
      }
    }
  }

  const changeInputValue5 = (svg: SVGSVGElement) => {
    const value = monitoringData.e ? monitoringData.e : 0

    const text = svg.getElementById('_5')
    if (text) {
      text.textContent = value.toString()
    }
  }
  const changeInputValue4 = (svg: SVGSVGElement) => {
    const value = monitoringData.d ? monitoringData.d : 0

    const text = svg.getElementById('_4')
    if (text) {
      text.textContent = value.toString()
    }
  }
  const changeInputValue3 = (svg: SVGSVGElement) => {
    const value = monitoringData.c ? monitoringData.c : 0

    const text = svg.getElementById('_3')
    if (text) {
      text.textContent = value.toString()
    }
  }
  const changeInputValue2 = (svg: SVGSVGElement) => {
    const value = monitoringData.b ? monitoringData.b : 0

    const text = svg.getElementById('_2')
    if (text) {
      text.textContent = value.toString()
    }
  }
  const changeInputValue1 = (svg: SVGSVGElement) => {
    const value = monitoringData.a ? monitoringData.a : 0

    const text = svg.getElementById('_50')
    if (text) {
      text.textContent = value.toString()
    }
  }

  return (
    <div className='svg-container'>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <ReactSVG
          afterInjection={svg => {
            if (!svg) {
              console.error('Error injecting SVG.')

              return
            }

            changeMotorsColor(svg)
            changeInputValue1(svg)
            changeInputValue2(svg)
            changeInputValue3(svg)
            changeInputValue4(svg)
            changeInputValue5(svg)
          }}
          className='svg-content'
          desc='Description'
          evalScripts='always'
          fallback={() => (
            <Stack justifyContent={'center'} alignItems={'center'}>
              <CircularProgress />
            </Stack>
          )}
          httpRequestWithCredentials={false}
          renumerateIRIElements={false}
          beforeInjection={svg => {
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
            svg.removeAttribute('width')
            svg.removeAttribute('height')
          }}
          src='/textFieldss.svg' // Reference without `public`
          title='Title'
          useRequestCache={true}
          wrapper='div'
        />
      )}
    </div>
  )
}
export default Home
