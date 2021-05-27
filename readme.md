# 支付

## 支付流程
1. 扫码进入扫码页面
2. 填写支付金额
3. 点击提交按钮，获取用户手机号
4. 用户授权手机号   -6   （已授权手机号的设备无需再授权）
5. 用户拒绝授权手机号  -6   （拒绝后用户下次扫码再获取，此次支付使用用户的unionid来发起）
6. 获取用户优惠信息，如果没有优惠信息，则直接请求支付
7. 用户选择支付类型(['在线支付', '充值支付'])
8. 用户选择是否使用红包
9. 如果用户使用红包，则需输入密码
10. 请求支付
11. 支付成功

优势： 最好情况下，用户只用（ 填写支付金额，提交 ）就能发起支付。                               （没有红包，没有股东折扣，没有优惠券，没有充值余额）

劣势： 最坏情况下，用户需要(填写支付金额， 提交， 授权， 选择红包，提交， 输入密码) 才可发起支付   （使用红包的情况下）


5.27 确定支付流程，支付方式选择，发起支付

充值支付

分店系统账号