User
=========

User relative apis
> All api use POST method

### login
```typescript
url: [host]/login   
content-type: application/json 
example:
    {"un":"lee", "pwd":"angus"}
return:
    success:
        {"code":200, "data":[jwt], "msg": [*]}
    error:
        {"code": [code], "msg":[*]}
```

### refresh
```typescript
url: [host]/refresh
example:
    {"token": [jwt]}
return:
    success:
        {"code":200, "data":[jwt], "msg":[*]}
    error:
        {"code": [code], "msg":[*]}
```
### register
```typescript
url: [host]/register
example:
    {"un":"lee", "pwd":"angus"}
return:
    success:
        {"code":200, "data":[jwt], "msg": [*]}
    error:
        {"code": [code], "msg":[*]}
```