# Data Model

This is a starting model for a future backend.

## User

```json
{
  "id": "user_001",
  "displayName": "Local Reporter 18",
  "homeState": "Madhya Pradesh",
  "homeDistrict": "Indore",
  "verificationLevel": "basic",
  "trustScore": 86,
  "createdAt": "2026-06-23T00:00:00.000Z"
}
```

## Issue

```json
{
  "id": "issue_001",
  "title": "Main road par 3 mahine se gaddhe",
  "category": "Road",
  "level": "area",
  "state": "Madhya Pradesh",
  "district": "Indore",
  "locationText": "Ward 12, Indore",
  "geo": {
    "lat": 22.7196,
    "lng": 75.8577
  },
  "status": "Verified",
  "severity": "High",
  "reporterId": "user_001",
  "supports": 284,
  "verifications": 42,
  "evidenceCount": 7,
  "createdAt": "2026-06-04T00:00:00.000Z"
}
```

## Evidence

```json
{
  "id": "evidence_001",
  "issueId": "issue_001",
  "type": "photo",
  "url": "https://example.com/evidence.jpg",
  "uploadedBy": "user_001",
  "verificationStatus": "pending",
  "createdAt": "2026-06-04T00:00:00.000Z"
}
```

## Leader profile

```json
{
  "id": "leader_001",
  "name": "Fictional Leader",
  "role": "MLA",
  "area": "Example Area",
  "scores": {
    "resolution": 4.1,
    "promises": 3.6,
    "response": 4.4,
    "transparency": 3.8,
    "feedback": 3.9,
    "conduct": 4.2
  }
}
```

## Audit log

Every important change should create an audit log.

```json
{
  "id": "audit_001",
  "entityType": "issue",
  "entityId": "issue_001",
  "action": "status_changed",
  "before": "Pending",
  "after": "Verified",
  "changedBy": "moderator_001",
  "createdAt": "2026-06-23T00:00:00.000Z"
}
```
