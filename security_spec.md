# Security Specification: Alps Skincare Pure Essence Firestore Rules

## 1. Data Invariants

1. **User Profile Invariant**:
   - A user profile at `/users/{userId}` can only be accessed or modified by the authenticated user whose `request.auth.uid == userId`.
   - Critical identity fields (`userId`) cannot be modified on update.
   - PII (`phone`, `address`, `email`) is protected and isolated to the authenticated user.
   - Blanket reads are forbidden; users cannot list all users.

2. **Order Integrity & Isolation Invariant**:
   - An order at `/users/{userId}/orders/{orderId}` must belong strictly to the owning user (`request.auth.uid == userId` and `incoming().userId == userId`).
   - Only the owning user can view, create, or update delivery information for their own orders.
   - When updating an order, the user can only update delivery fields (`buyerName`, `phone`, `shippingAddress`) while status is `'processing'`.
   - The user cannot change the `totalAmount`, `items`, `orderNumber`, `createdAt`, or `userId` after creation.

3. **Public Review Invariant**:
   - Any user can read product reviews at `/reviews/{reviewId}`.
   - Only authenticated users can submit a review, and `incoming().userId` must strictly match `request.auth.uid`.
   - The rating must be an integer or number between 1 and 5.
   - Comment size is bounded (<= 1500 characters).
   - Only the author can edit their review, or any authenticated user can increment `helpfulCount` by at most 1.

4. **Personalized Cart Invariant**:
   - A shopping cart at `/carts/{userId}` can only be read, written, or cleared by the authenticated owner (`request.auth.uid == userId`).
   - Blanket listing across `/carts` is forbidden.
   - The data payload must have `{ items: [...] }` with bounded items size (<= 50 items).

5. **Catch-All Default Deny**:
   - Any unmapped collections or paths are blocked (`allow read, write: if false;`).

---

## 2. The "Dirty Dozen" Payloads (Adversarial Payloads)

1. **Payload 1: Unauthenticated Profile Write**
   - Attempt: Write to `/users/alice` with no `request.auth`.
   - Expected: `PERMISSION_DENIED`.

2. **Payload 2: Profile Impersonation / Cross-User Write**
   - Attempt: User with UID `mallory` writes to `/users/victim` setting `userId: "victim"`.
   - Expected: `PERMISSION_DENIED`.

3. **Payload 3: User ID Hijack in Body**
   - Attempt: User with UID `mallory` writes to `/users/mallory` with `userId: "admin"`.
   - Expected: `PERMISSION_DENIED`.

4. **Payload 4: Blanket User Listing (PII Scraping)**
   - Attempt: Query `list` across `/users`.
   - Expected: `PERMISSION_DENIED`.

5. **Payload 5: Oversized String Denial-of-Wallet Attack**
   - Attempt: User attempts to write 500KB string into `address` or `name`.
   - Expected: `PERMISSION_DENIED` (due to `.size() <= 300` / `.size() <= 100` checks).

6. **Payload 6: Cross-User Order Injection**
   - Attempt: User `attacker` creates an order inside `/users/victim/orders/order-123`.
   - Expected: `PERMISSION_DENIED`.

7. **Payload 7: Post-Fulfillment Order Price Tampering**
   - Attempt: User attempts to update `totalAmount: 0` on existing order.
   - Expected: `PERMISSION_DENIED` (affectedKeys must only include shipping delivery fields).

8. **Payload 8: Terminal Order Modification**
   - Attempt: User attempts to update delivery address on an order with `status: "delivered"` or `"shipping"`.
   - Expected: `PERMISSION_DENIED` (only allowed when status == 'processing').

9. **Payload 9: Anonymous / Spoofed Review Creation**
   - Attempt: Unauthenticated client creates `/reviews/rev-1` with arbitrary data.
   - Expected: `PERMISSION_DENIED`.

10. **Payload 10: Fake Review Author Spoofing**
    - Attempt: Authenticated user `bob` creates review with `userId: "alice"`.
    - Expected: `PERMISSION_DENIED` (incoming().userId == request.auth.uid enforced).

11. **Payload 11: Invalid Rating Range Attack**
    - Attempt: User submits `rating: 99` or `rating: -5` or `rating: "five"`.
    - Expected: `PERMISSION_DENIED` (rating must be number >= 1 && <= 5).

12. **Payload 12: Review Poisoning / Ghost Field Injection**
    - Attempt: User submits review with ghost property `isAdminVerified: true`.
    - Expected: `PERMISSION_DENIED` (keys().hasOnly() schema enforcement).
