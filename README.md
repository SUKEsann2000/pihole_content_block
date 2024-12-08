# <img src="public/icons/icon_48.png" width="45" align="left"> Pihole_content_block

# Description

Pihole_blocking on Blowser

Pi-holeにおいてブロックされ、エラーを吐いてそのままのエレメントを削除します。

普通に404吐いてるiframeとかも削除しますので注意してください。

## What do this program do?

1. DOMのロードまで待つ
2. エラーを起こしているエレメント（'IMG','SCRIPT','IFRAME','LINK','DIV','SPAN'）を探す
3. そのエレメントを0.5秒後に削除

1. Wait for loading DOM
2. Serch element('IMG','SCRIPT','IFRAME','LINK','DIV','SPAN') that is causing an error
3. Delete the element after 0.5 seconds

## Contribution

Suggestions and pull requests are welcomed!.

プルリクとか大歓迎です！！
（自分の作業が雑で雑で仕方がないので間違えてたら言ってください）

## ReleaseNote
| Version | Description |
| ------- | ----------- |
| 0.1.0   | 土台作成 |

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)