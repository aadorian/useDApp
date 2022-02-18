import React, { useEffect, useState } from 'react'
import { useBlockMeta, useBlockNumber, useEthers } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import ReactJson from 'react-json-view'
import Avatar from 'react-avatar'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark} from 'react-syntax-highlighter/dist/esm/styles/hljs'

const URL_API_CALL = `https://api-testnet.aurorascan.dev/api?module=proxy&
action=eth_gasPrice
&apikey=${process.env.REACT_APP_API_KEY}`

const Componente = (url: any) => {
  const codeString = url
  return (
    <SyntaxHighlighter language="javascript" style={dark} >
      {codeString}
    </SyntaxHighlighter>
  )
}
export  function Block() {
  const KEY = 'YGRNMEH7YWIWISSNVWFRRXI1HI8ETIKQHK'
  const ERC20_ADDRESS = '0x1e138b96BeF348baBcF13C35956502F36c0C6e84'
  const blockNumber = useBlockNumber()
  const { chainId, account } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()
  const [getJSON, setJSON] = useState(null)
  const [balance, setBalance] = useState<any[]>([])
  useEffect(() => {
		getData()
		async function getData() {
      const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
     
        }}
      //Get ETH Balance for a single Address _OK
    // const response= await fetch(`https://api-testnet.aurorascan.dev/api?module=account&action=balance&address=${account}&tag=latest&apikey=${KEY}`,headers )

    //Get a list of 'Normal' Transactions By Address -OK transacciones de una direccion contrato
    // const response = await fetch(`https://api-testnet.aurorascan.dev/api?module=account&action=txlist&address=${ERC20_ADDRESS}&startblock=1&endblock=99999999&sort=asc&apikey=${KEY}`,headers )

    // Gas Price -OK
     //const response = await fetch(`https://api-testnet.aurorascan.dev/api?module=proxy&action=eth_gasPrice&apikey=${KEY}`,headers )

      
    //Get a list of "ERC721 - Token Transfer Events" by Address

    //Get Contract ABI for Verified Contract Source Codes -OK
    const response = await fetch(`https://api-testnet.aurorascan.dev/api?module=contract&action=getabi&address=${ERC20_ADDRESS}&apikey=${KEY}`,headers )

   
    
    const data = await response.json()
    setBalance(data.result)
		setJSON(data) 
    
		}
	}, [])
        
  return (
    <MainContent>
      <Container>
        <Section>
        <Avatar round="10px" size= "50px" src='https://i.imgur.com/U1dkSOb.png' /> 
        {Componente(URL_API_CALL)}
          <ContentBlock>
          <ReactJson collapsed={2} displayDataTypes={false} theme={{
                base00: "#white",
                base01: "#white",
                base02: "#9c9c9c",
                base03: "#9c9c9c",
                base04: "#9c9c9c",
                base05: "#444",
                base06: "#444",
                base07: "#444",
                base08: "#9c9c9c",
                base09: "#9c9c9c",
                base0A: "#9c9c9c",
                base0B: "#9c9c9c",
                base0C: "#9c9c9c",
                base0D: "#9c9c9c",
                base0E: "#9c9c9c",
                base0F: "#9c9c9c"
            }}
          src={{getJSON}} />
         
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
