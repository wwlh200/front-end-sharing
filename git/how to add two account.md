## how to add two account
### first
- ssh-keygen -t rsa -C "v-whwang@expedia.com"
- ssh -T git@github.com 
### second
- ssh-keygen -t rsa -f ~/.ssh/id_rsa2 -C "wwlh200@163.com"
- ssh -T git@github.com -i ~/.ssh/id_rsa2 
### third
如果报错，就在git bash here 里面执行这句话
- ssh-agent bash
- ssh-add ~/.ssh/id_rsa2
### config file（注意，是config, 而不是.config）
Host    　　主机别名  
HostName　　服务器真实地址  
IdentityFile　　私钥文件路径  
PreferredAuthentications　　认证方式  
User　　用户名  

```
# 配置user1 
Host github.expedia.biz
HostName github.expedia.biz
IdentityFile ~/.ssh/id_rsa
PreferredAuthentications publickey
User whwang

# 配置user2
Host github.com
HostName github.com
IdentityFile ~/.ssh/id_rsa2
PreferredAuthentications publickey
User wwlh200
```
### config user and email
- git config --global user.name "whwang"
- git config --global user.email "v-whwang@expedia.com"