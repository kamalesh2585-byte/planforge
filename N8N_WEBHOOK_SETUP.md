# n8n Webhook Response Setup Guide

## Problem
Your n8n webhook is receiving requests from PlanForge AI but **not sending responses back**.

## Solution
You need to add a **Respond to Webhook** node at the end of your workflow.

### Step 1: Add "Respond to Webhook" Node

1. In your n8n workflow, click **"+"** to add a new node
2. Search for **"Respond to Webhook"**
3. Click on it to add it

### Step 2: Configure the Response Node

The response node should receive the data from your workflow and send it back.

**Set Response Body to:**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "{{ $node['Your_Node_Name'].json.id }}",
    "orderName": "{{ $node['Your_Node_Name'].json.orderName }}",
    "status": "created"
  }
}
```

Or simpler version:

```json
{
  "success": true,
  "message": "Order received and processing",
  "status": "pending"
}
```

### Step 3: Set Response Status Code

Set the **Response Status Code** to `200` for success or `400` for errors.

### Step 4: Enable CORS (if needed)

If you get CORS errors, set:
- **Response Headers:**
  ```
  Access-Control-Allow-Origin: *
  Content-Type: application/json
  ```

### Step 5: Connect the Workflow

1. Connect your last processing node to the **"Respond to Webhook"** node
2. Make sure the response node is **always executed** at the end

### Example Workflow Structure:

```
Webhook Trigger
    ↓
[Your Processing Nodes]
    ↓
Respond to Webhook ← Must be here!
    ↓
Response sent back to PlanForge AI
```

## Test Response Format

Your backend should return:

```json
{
  "success": true,
  "message": "Order created successfully",
  "id": "ORD-001",
  "orderName": "PO-2024-001",
  "status": "created"
}
```

Or on error:

```json
{
  "success": false,
  "message": "Invalid order data",
  "error": "Quantity must be greater than 0"
}
```

## Frontend Will Now:

✅ Display success message with data  
✅ Add order to table  
✅ Auto-close after 2 seconds  
✅ Show errors if response fails  
✅ Timeout after 5 seconds if no response

## Debugging

Check browser console (F12) to see:
- **Request sent:** `📤 Sending to n8n webhook: {...}`
- **Response received:** `📥 Backend response: {...}`
- **Errors:** `❌ Backend error: {...}`

## Common Issues

| Issue | Solution |
|-------|----------|
| No response | Add "Respond to Webhook" node to workflow |
| CORS error | Enable CORS headers in response node |
| Timeout | Check if n8n workflow is running |
| 404 error | Verify webhook URL is correct |
| Empty response | Set response body in webhook node |

## Questions?

If n8n workflow is still not responding, check:
1. Is the webhook URL correct?
2. Is n8n running?
3. Is the workflow activated?
4. Are there errors in n8n logs?

Contact your backend team for support!
