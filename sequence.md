participant User
participant Web
participant Server
participant DB
participant Reseller
participant PaySystem
participant Admin

User -> Web: goes to website
Web -> Server: fetch available books
Server -> DB: select first N paginated books (top)
DB -> Server: top books
Server -> Web: available books
Web -> User: static web page

alt Book search
  User -> Web: apply filter / pagination / search
  Web -> Server: select books by filter
  Server -> DB: select books by filter
  DB -> Server: books by filter
  Server -> Web: books by filter
  Web -> User: render books by filter
end

alt Select specific book
  User -> Web: open specific book
  Web -> Server: fetch book details by ID
  Server -> DB: book details, subscription details
  DB -> Server: book, subscription details
  Server -> Web: book, subscription details
  Web -> User: render all book and subscription details
end

alt Authorization
  User -> Web: log in
  Web -> Server: 3rd part token (e.g. oAuth2)
  Server -> DB: find or create user
  DB -> Server: found user information
  Server -> Web: user information
  Web -> User: user is authorized, login name is displayed
end

alt Logout
  User -> Web: log out
  Web -> Server: log out
  Server -> Web: clear active session
  Web -> User: user is logged out
end

alt Subscribe
  User -> Web: buy subscription
  Web -> Server: fetch subscription details
  Server -> DB: fetch subscription reseller and price
  DB -> Server: subscription reseller and price
  Server -> Web: subscription reseller and price
  Web -> Web: open 3rd party payment system
  Web -> User: provide payment information form
  User -> Web: pass card details information, click submit
  alt Successful purchase
    Web -> PaySystem: payment passed
    PaySystem -> Server: payment successful
    Server -> DB: update subscription of logged in user
    DB -> Server: subscription is updated
    Server -> Web: payment successful
    Web -> Web: redirect to books details
    Web -> User: purchase successful, book is available
  else payment error
    Web -> PaySystem: payment error
    PaySystem -> Server: payment error
    Server -> Web: payment error
    Web -> User: purchase is not successful, please try again
  end
end

alt Provide token to 3rd party organization
  Reseller -> Web: request for token and collaboration
  Web -> Admin: new token request (eg via email)
  Admin -> Server: create token for resellers
  Server -> DB: pass org details
  DB -> Server: token to upload books
  Server -> Admin: token
  Admin -> Reseller: provide token (eg via email)
end

alt Subscription expiration
  Server -> Server: check user subscription
  alt Subscription is valid
    Server -> Server: skip further actions
  else Subscription is expired
    Server -> DB: subscription is expired (remove from DB active subscription)
    DB -> Server: subscription is removed
    Server -> User: notify about expired subscription (eg via email)
  end
end
