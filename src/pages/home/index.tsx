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
    let color2 = ''

    if (value === 0) {
      color = '#FF0000'
      color2 = 'rgba(256,256,256,0.53)'
    } else {
      color = '#green'
      color2 = 'rgba(256,256,256,0.00)'
    }

    const motor = svg.querySelector('.cls-8') as SVGGraphicsElement
    const motorrrr = svg.querySelector('.cls-9') as SVGGraphicsElement

    console.log(motorrrr)

    // motor.setAttribute('stroke', color)
    // motor.setAttribute('stroke-width', color)
    motor.setAttribute('style', `fill: ${color}; stroke-width: 2;`)
    motorrrr.setAttribute('style', `fill: ${color2}; stroke-width: 2;`)
  }

  const changeInputValue5 = (svg: SVGSVGElement) => {
    const value = monitoringData.e ? monitoringData.e : 0
    let textCol
    if (monitoringData.f === 0) {
      textCol = '#E8E8E8'
    } else {
      textCol = '#1c1c1c'
    }
    const text = svg.getElementById('_5')
    const textBg = svg.getElementById(`_5_1`) as HTMLElement

    if (text) {
      text.textContent = `${value.toString()}rpm`
      text.setAttribute('fill', textCol) // Replace "desiredColor" with the color you want, e.g., "#FF0000" for red

      // textBg.style.fill = '#FF0000'
    }
  }

  const changeInputValue4 = (svg: SVGSVGElement) => {
    const value = monitoringData.d ? monitoringData.d : 0
    let textCol
    if (monitoringData.f === 0) {
      textCol = '#E8E8E8'
    } else {
      textCol = '#1c1c1c'
    }
    const text = svg.getElementById('_4')
    const textBg = svg.getElementById(`_4_1`) as HTMLElement

    if (text) {
      text.textContent = `${value.toString()}°C`
      text.setAttribute('fill', textCol) // Replace "desiredColor" with the color you want, e.g., "#FF0000" for red

      // textBg.style.fill = '#FF0000'
    }
  }

  const changeInputValue3 = (svg: SVGSVGElement) => {
    const value = monitoringData.c ? monitoringData.c : 0
    let textCol
    if (monitoringData.f === 0) {
      textCol = '#E8E8E8'
    } else {
      textCol = '#1c1c1c'
    }
    const text = svg.getElementById('_3')
    const textBg = svg.getElementById(`_3_1`) as HTMLElement

    if (text) {
      text.textContent = `${value.toString()}°C`
      text.setAttribute('fill', textCol) // Replace "desiredColor" with the color you want, e.g., "#FF0000" for red

      textBg.style.fill = '#FF0000'
      textBg.style.fill = value > 200 && monitoringData.f === 1 ? '#FF0000' : '#E8E8E8'
    }
  }

  const changeInputValue2 = (svg: SVGSVGElement) => {
    const value = monitoringData.b ? monitoringData.b : 0
    let textCol
    if (monitoringData.f === 0) {
      textCol = '#E8E8E8'
    } else {
      textCol = '#1c1c1c'
    }

    const text = svg.getElementById('_2')
    const textBg = svg.getElementById(`_2_1`) as HTMLElement

    if (text) {
      text.textContent = `${value.toString()}kg/h`
      text.setAttribute('fill', textCol) // Replace "desiredColor" with the color you want, e.g., "#FF0000" for red

      // textBg.style.fill = '#FF0000'
    }
  }

  const changeInputValue1 = (svg: SVGSVGElement) => {
    const value = monitoringData.a ? monitoringData.a : 0
    let textCol
    if (monitoringData.f === 0) {
      textCol = '#E8E8E8'
    } else {
      textCol = '#1c1c1c'
    }
    const text = svg.getElementById('_50')
    text.setAttribute('fill', textCol) // Replace "desiredColor" with the color you want, e.g., "#FF0000" for red

    // const textBg = svg.getElementById(`_50_1`) as HTMLElement

    if (text) {
      text.textContent = `${value.toString()}rpm`
      // textBg.style.fill = '#FF0000'
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
          src='/SVG - OpacityRect- v3.svg' // Reference without `public`
          title='Title'
          useRequestCache={true}
          wrapper='div'
        />
      )}
    </div>
  )
}
export default Home
