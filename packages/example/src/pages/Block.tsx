import React, { useEffect, useState } from 'react'
import { useBlockMeta, useBlockNumber, useEthers } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import ReactJson from 'react-json-view'
import { formatEther } from 'ethers/lib/utils'



export  function Block() {
  const blockNumber = useBlockNumber()
  const { chainId, account } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()
  const [nftTransactions, setNFTData] = useState(null)
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
		getData()
		async function getData() {
      const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
     
        }}
     const response = await fetch(`https://api-testnet.aurorascan.dev/api?module=account&action=balance&address=${account}&tag=latest&apikey=YGRNMEH7YWIWISSNVWFRRXI1HI8ETIKQHK`,headers )
		const data = await response.json()
    setItems(data.result)
		setNFTData(data) 
    
		}
	}, [])
        
  return (
    <MainContent>
      <Container>
        <Section>
       
       
          <ContentBlock>
          <ReactJson collapsed={2} displayDataTypes={false} theme={{
                base00: "white",
                base01: "#a876f5",
                base02: "#a876f5",
                base03: "#9c54fc",
                base04: "#9c54fc",
                base05: "#444",
                base06: "#444",
                base07: "#444",
                base08: "#444",
                base09: "#9c54fc",
                base0A: "rgba(70, 70, 230, 1)",
                base0B: "rgba(70, 70, 230, 1)",
                base0C: "rgba(70, 70, 230, 1)",
                base0D: "rgba(70, 70, 230, 1)",
                base0E: "rgba(70, 70, 230, 1)",
                base0F: "#d0baf5"
            }}
          src={{nftTransactions}} />
           <TextInline><Label>Balance: </Label>{items}</TextInline>
       
            <ContentRow>
              <Label>Chain id:</Label> <TextInline>{chainId}</TextInline>
            </ContentRow>
            <ContentRow>
              <Label>Current block:</Label> <TextInline>{blockNumber}</TextInline>
            </ContentRow>
            {difficulty && (
              <ContentRow>
                <Label>Current difficulty:</Label> <TextInline>{difficulty.toString()}</TextInline>
              </ContentRow>
            )}
            {timestamp && (
              <ContentRow>
                <Label>Current block timestamp:</Label> <TextInline>{timestamp.toLocaleString()}</TextInline>
              </ContentRow>
            )}
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
