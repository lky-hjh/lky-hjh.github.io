---
title: "FPS 游戏框架解析"
date: "2026-04-25"
tags: ["游戏开发", "FPS", "UE5"]
---

# FPS 游戏框架解析

## 3C 系统

**Character** — 角色控制器
- 移动组件（CharacterMovementComponent）
- 动画蓝图（AnimBP）
- 状态机（Idle / Walk / Run / Jump / Crouch）

**Camera** — 摄像机
- 第一人称：CameraAttachToHead
- 第三人称：SpringArmComponent
- FOV 动态变化（跑动时拓宽视野）

**Control** — 输入处理
- Enhanced Input System
- Input Actions + Input Mapping Contexts
- 支持手柄/键鼠切换

## 武器系统架构

```
WeaponBase
├── HitscanWeapon  — 即时命中（步枪/狙击）
├── ProjectileWeapon — 弹道武器（火箭筒/榴弹）
└── MeleeWeapon    — 近战（刀/棍）
```

## 网络同步要点

- 客户端预测 + 服务端回滚（Client-Side Prediction）
- 延迟补偿（Lag Compensation）
- 状态同步为主，关键事件走 RPC
