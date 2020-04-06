## how to create .gitignore
在需要创建 .gitignore 文件的文件夹, 右键选择Git Bash 进入命令行
```
touch .gitignore
```
## how to clone project
```
git clone username@host:/path/to/repository
```
## add and commit
```
git add <filename>  
git add *  
git commit -m"commit information"
```
## commit update
```
git push origin master
```
## feature
- create feature
```
git checkout -b wheeler
```
- change feature
```
git checkout master
```
- delete feature
```
git branch -d wheeler
```
- commit feature
```
git push origin <branch>
```
## update localization from service
```
git pull origin master
```
## tag
```
git tag 1.00 1b2e1d63ff
```
## replase localization
```
git fetch origin  
git reset --hard origin/master
```
## other knowledge
- local push replace service  
```
git push -f origin wheeler
```
ssh-keygen -t rsa -C "wwlh200@163.com"
***

## how to remote local code
http://www.runoob.com/git/git-remote-repo.html

## how to change local remote address
- examine local origin address
```
$ git remote -v
// origin  git@github.com:xxx/example.git (push)
```
- change local remote address
```
git remote set-url origin git@git.xxx.com:xxx/example.git
```
- examine new local origin address
```
git remote -v
// origin  git@git.xxx.com:xxx/example.git (push)
```
