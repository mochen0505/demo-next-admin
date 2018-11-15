import React from 'react'
import Link from 'next/link'
import { Button } from 'antd'

export default () => (
    <ul>
        <li><Link href='/b' as='/aaaa'><a>a</a></Link></li>
        <li><Link href='/a' as='/bbbb'><a>b</a></Link></li>
        <li>
            <Link href={{pathname: '/posts', query: { id: '2' }}} as='/posts/2'>
                <a>post #2</a>
            </Link>
        </li>
        <li>
            <Button type='primary'>Ok</Button>
        </li>
    </ul>
)