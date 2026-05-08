---
title: "UE C++ 编程技巧总结"
date: "2026-04-28"
tags: ["UE5", "C++", "技术笔记"]
---

# UE C++ 编程技巧总结

## 命名规范

- 类：`UMyClass` / `AMyActor` / `FMyStruct`
- 成员变量：`m_MyVariable` 或 `MyVariable`
- 蓝图可访问：`UPROPERTY(BlueprintReadWrite)`
- 函数：`UFUNCTION(BlueprintCallable)`

## 常用容器

| 容器         | 特点                           |
| ------------ | ------------------------------ |
| `TArray`     | 动态数组，最常用               |
| `TMap`       | 哈希映射，Key-Value 存储       |
| `TSet`       | 无序集合，去重                 |
| `TQueue`     | 线程安全队列                   |

## 智能指针

- `TSharedPtr` — 共享所有权
- `TUniquePtr` — 独占所有权
- `TWeakPtr` — 弱引用，避免循环引用
- `TObjectPtr` — UE5 新引入，UObject 指针包装

## 蓝图互调

- `BlueprintCallable` — C++ 函数暴露给蓝图
- `BlueprintImplementableEvent` — C++ 声明，蓝图实现
- `BlueprintNativeEvent` — C++ 默认实现，蓝图可覆盖
