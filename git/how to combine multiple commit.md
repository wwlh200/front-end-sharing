## how to start
```
git rebase -i HEAD~3
```
指定最新合并的三个commit
## how to update control console
```
pick e7ba81d Commit-1
s 5756e15 Commit-2
s b1b8189 Commit-3
```
- 按Insert键
- 将control console上面的pick改成s
- 按Esc键
- 输入:wq!保存退出 

如果失败，输入git rebase --abort
## push to branch
```
git add .
git push -f origin wheeler
```

## only rebase own branch
```
git rebase origin wheeler
```
