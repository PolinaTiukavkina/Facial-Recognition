import UIKit
import Social
import UniformTypeIdentifiers // 👈 new import

class ShareViewController: SLComposeServiceViewController {
    override func isContentValid() -> Bool {
        return true
    }

    override func didSelectPost() {
        guard let extensionItem = extensionContext?.inputItems.first as? NSExtensionItem,
              let attachments = extensionItem.attachments else {
            self.extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
            return
        }

        for attachment in attachments {
            if attachment.hasItemConformingToTypeIdentifier(UTType.url.identifier) {
                attachment.loadItem(forTypeIdentifier: UTType.url.identifier, options: nil) { (data, error) in
                    if let url = data as? URL {
                        let sharedDefaults = UserDefaults(suiteName: "group.com.yourcompany.trace")
                        sharedDefaults?.set(url.absoluteString, forKey: "sharedURL")
                        sharedDefaults?.synchronize()
                    }

                    self.extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
                }
                return
            }
        }

        self.extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
    }

    override func configurationItems() -> [Any]! {
        return []
    }
}

