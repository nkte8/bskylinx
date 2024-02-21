import { Fragment, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { type popupContent, type msgInfo } from "../common/types"
import { Profile_context } from "../common/contexts"
import ShareButton from "./ShareButton"
import { getOgpV2 } from "../../../utils/getOgp"
import Tweetbox from "../common/Tweetbox"
import { ogpMeta } from "@/utils/getMeta"
import { readShowTaittsuu } from "@/utils/localstorage"

export const Component = ({
    popupContent,
    setMsgInfo
}: {
    popupContent: popupContent,
    setMsgInfo: Dispatch<SetStateAction<msgInfo>>
}) => {
    const { profile } = useContext(Profile_context)
    const [ogpUrl, setOgpUrl] = useState<string | null>(null)
    const [ogpMeta, setOgpMeta] = useState<ogpMeta | null>(null)
    const previewOgp = async () => {
        if (popupContent.url !== null) {
            try {
                let html = await fetch(
                    `/api/fetchHTML?url=${popupContent.url}`
                ).then((text) => text.text()
                ).catch()
                const ogp = await getOgpV2(html)
                const url = ogp.imageUrl
                const meta = {title: ogp.title, description: ogp.description}
                setOgpUrl(url)
                setOgpMeta(meta)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    let msg: string = ""
                    switch (error.message) {
                        case "Failed to fetch":
                            msg = "URLに設定されていないか、URL誤りでリンクカードを設定できませんでした。"
                            break
                        default:
                            msg = error.name + ": " + error.message
                            break
                    }
                    setMsgInfo({
                        isError: true,
                        msg: msg
                    })
                }
                setOgpUrl(null)
                setOgpMeta(null)
            }
        }
    }
    useEffect(() => {
        previewOgp()
    }, [popupContent])
    return (
        <>
            <div className="text-lg font-medium">Xへの投稿プレビュー画面</div>
            <Tweetbox>
                <div className="flex m-2">
                    <div className="flex-none w-fit">
                        <img src={profile?.avatar} className="w-12 h-12 inline-block rounded-full" />
                    </div>
                    <div className="text-left ml-3 break-all">
                        {
                            popupContent.content.split(/(\n)/).map((value, index) => {
                                return <Fragment key={index}>
                                    {value.match(/\n/) ? <br /> : value}
                                </Fragment>
                            })
                        }
                    </div>
                </div>
                <div className="block relative h-fit w-fit">
                    {popupContent.url !== null &&
                        <>
                            {
                                ogpUrl !== null && (
                                    <img src={ogpUrl} className="w-full rounded-3xl" />
                                )
                            }
                            {
                                ogpMeta !== null && (
                                    <div className="absolute bottom-2 left-4 bg-opacity-70 rounded-md px-2 text-white bg-black">
                                        {ogpMeta.title}
                                    </div>
                                )
                            }
                        </>}
                </div>
            </Tweetbox>
            <div className="max-w-xl mx-auto text-left">
                <b>実際の投稿内容は、Xの投稿画面で再度確認お願いします。</b>
                また、文字数がTwitterの制限(140字)を超えている場合はそのまま投稿できません。
                編集により文字数を手動で調整してください。
            </div>
            <div className="mx-auto w-fit">
                <ShareButton
                    intentKind="xcom"
                    className="block mx-auto"
                    labeltext={<div className="mb-0">Xでポストする</div>}
                    clikedtext={<div className="mb-0 text-xs">ポップアップを実行しました</div>}
                    content={popupContent.content}
                    disabled={false} />
                {
                    readShowTaittsuu(false) &&
                    <ShareButton
                        intentKind="taittsuu"
                        className="block mx-auto mt-2"
                        labeltext={<div className="mb-0">タイッツーでポストする</div>}
                        clikedtext={<div className="mb-0 text-xs">ポップアップを実行しました</div>}
                        content={popupContent.content}
                        disabled={false} />
                }
            </div>
        </>
    )
}
export default Component